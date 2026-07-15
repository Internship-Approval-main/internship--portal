import API from "./api";

export const getDashboard = async () => {

    const res = await API.get("/coordinator/dashboard");

    console.log(res.data);

    return res.data;
};