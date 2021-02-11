import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const NewTutor = async (firstname, lastname, email, selectedID, password, newTutorModal, successStatus, failureStatus) => {
    const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        departmentid: selectedID,
        password: password,
        title: "tutor",
    };

    try {
        const res = await authAxios.post(`/tutor/register`, data, {
            withCredentials: true,
        });
        let response = [];

        if (!res) {
            const secondRes = await axios.post(
                `${process.env.REACT_APP_API_URL}/tutor/register`,
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

        console.log("New tutor added=> ", response);
        newTutorModal(false);
        successStatus(true);
        setTimeout(() => {
            successStatus(false);
        }, 5000);
    } catch (error) {
        console.log(error);
        newTutorModal(false);
        failureStatus(true);
        setTimeout(() => {
            failureStatus(false);
        }, 10000);
    }
};

export default NewTutor;