import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const NewStudent = async (firstname, lastname, email, dateofbirth, nationality, selectedID, password, newStudentModal, successStatus, failureStatus) => {
    const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        dateofbirth: dateofbirth,
        nationality: nationality,
        departmentid: selectedID,
        password: password,
        title: "student",
    };

    try {
        const res = await authAxios.post(`/student/register`, data, {
            withCredentials: true,
        });
        let response = [];

        if (!res) {
            const secondRes = await axios.post(
                `${process.env.REACT_APP_API_URL}/student/register`,
                data,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            response = await secondRes.data;
        } else {
            response = await res.data;
        }

        console.log("New student added=> ", response);
        newStudentModal(false);
        successStatus(true);
        setTimeout(() => {
            successStatus(false);
        }, 5000);
    } catch (error) {
        console.log(error);
        newStudentModal(false);
        failureStatus(true);
        setTimeout(() => {
            failureStatus(false);
        }, 10000);
    }
};

export default NewStudent;