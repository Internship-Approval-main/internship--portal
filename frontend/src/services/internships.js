import API from "../services/api";

const submitForm = async () => {

    try{

        await API.post("/internships",{

            company,

            role,

            paid,

            stipend,

            managerName,

            managerEmail

        });

        alert("Submitted Successfully");

    }

    catch(err){

        console.log(err);

    }

};