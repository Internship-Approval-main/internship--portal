import API from "../services/api";

const login = async () => {

    try{

        const res = await API.post("/auth/login",{

            srn,

            password

        });

        localStorage.setItem(
            "token",
            res.data.token
        );

        alert("Login Successful");

    }

    catch(err){

        alert(err.response.data.message);

    }

};