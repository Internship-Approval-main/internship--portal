from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal
import pymongo

router = APIRouter(prefix="/faculty", tags=["Faculty Portal"])

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["internship_db"]
collection = db["internship_records"]

class FacultyReviewAction(BaseModel):
    srn: str
    placement_index: int = 0
    action: Literal["Approved", "Rejected"]

@router.get("/applications")
async def get_all_applications():
    records = list(collection.find({}, {"_id": 0}))
    return {"status": "success", "data": records}

@router.post("/review")
async def review_application(review: FacultyReviewAction):
    student = collection.find_one({"srn": review.srn})
    if not student:
        raise HTTPException(status_code=404, detail="Student record not found.")

    update_field = f"placements.{review.placement_index}.status"
    collection.update_one({"srn": review.srn}, {"$set": {update_field: review.action}})
    return {"status": "success", "message": f"Updated status to {review.action}"}