from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
import pymongo
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI()

# Enable CORS for frontend website communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection Setup
MONGO_DB_NAME = "internship_db"
MONGO_COLLECTION_NAME = "internship_records"
MASTER_COLLECTION_NAME = "master_database"  # Matches your exact collection name in Compass

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client[MONGO_DB_NAME]
collection = db[MONGO_COLLECTION_NAME]
master_collection = db[MASTER_COLLECTION_NAME]


# 1. The Sub-Blueprint: Details for an individual internship placement
class InternshipDetails(BaseModel):
    campus_type: str               # "on campus" or "off campus"
    internship_type: str           # "industry" or "research"
    company: str                   # Company Name OR Institute Name
    role: str                      # Job Role or Position
    start_date: str                # YYYY-MM-DD
    end_date: str                  # YYYY-MM-DD
    
    # Conditional Optional Fields
    manager_name: Optional[str] = None       
    manager_email: Optional[str] = None       
    research_centre: Optional[str] = None    


# 2. The Main Blueprint: The complete student profile submission
class StudentInternshipSubmission(BaseModel):
    srn: str                       # Pulled dynamically from login session
    student_name: str
    student_email: str
    semester: str                  # e.g., "8"
    placements: List[InternshipDetails] = Field(..., max_items=2)


# Helper function to process email dispatching securely
def send_reminder_email(to_email: str, student_name: str, srn: str):
    """Connects to an SMTP mail server and sends a secure reminder email."""
    sender_email = "your_department_email@gmail.com"
    sender_password = "your_app_password_here" 
    
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = to_email
    message["Subject"] = f"URGENT: Submit Your Internship Details - {srn}"
    
    body = f"""
    Dear {student_name},
    
    Our records show that you have not yet completed the 8th Semester Internship Registration form.
    This details-mapping is mandatory for graduation clearance.
    
    Please log in to the portal and submit your details immediately.
    
    Regards,
    Department Placement Cell
    """
    message.attach(MIMEText(body, "plain"))
    
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, message.as_string())
        server.quit()
        print(f" Email successfully dispatched to {student_name} ({to_email})")
    except Exception as e:
        print(f" Failed to send email to {student_name}: {str(e)}")


# 3. Route for students to submit their internship details from the front-end
@app.post("/submit-record")
async def save_student_internships(submission: StudentInternshipSubmission):
    doc = submission.model_dump()
    
    # Normalize data formatting inside placements array
    for placement in doc["placements"]:
        placement["campus_type"] = placement["campus_type"].strip().lower()
        placement["internship_type"] = placement["internship_type"].strip().lower()
        if placement["research_centre"]:
            placement["research_centre"] = placement["research_centre"].strip()

    # Dynamic Upsert
    result = collection.update_one(
        {"srn": doc["srn"]}, 
        {"$set": doc},        
        upsert=True           
    )
    
    if result.matched_count > 0:
        return {"status": "success", "message": f"Updated internship data records for {doc['student_name']}"}
    else:
        return {"status": "success", "message": f"Successfully registered system entry for {doc['student_name']}"}


# 4. Route for Admins to check missing profiles and send automated reminders
@app.post("/admin/remind-missing-students")
async def remind_missing_students(background_tasks: BackgroundTasks):
    """
    Finds all 8th sem students who haven't submitted their internship details 
    and triggers an automated email background task for each.
    """
    # MongoDB Aggregation Pipeline to cross-verify collections via Left Anti-Join
    pipeline = [
        {"$match": {"semester": "8"}},
        {
            "$lookup": {
                "from": MONGO_COLLECTION_NAME,
                "localField": "srn",
                "foreignField": "srn",
                "as": "submission"
            }
        },
        {"$match": {"submission": {"$size": 0}}}
    ]
    
    missing_students = list(master_collection.aggregate(pipeline))
    
    if not missing_students:
        return {"status": "success", "message": "All 8th semester students have submitted their details!"}
    
    for student in missing_students:
        email = student["student_email"]
        name = student["student_name"]
        srn = student["srn"]
        
        # Runs mailer jobs in parallel background streams so execution threads don't choke
        background_tasks.add_task(send_reminder_email, email, name, srn)
        
    return {
        "status": "success", 
        "message": f"Found {len(missing_students)} pending students. Emails are being sent in the background."
    }