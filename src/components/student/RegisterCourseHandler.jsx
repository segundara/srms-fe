import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import { format } from "date-fns";

const RegisterCourse = async (courseid, examdate, userID, dataUpdate, successStatus, failureStatus) => {
    const data = {
        studentid: userID,
        courseid: courseid,
        reg_date: format(new Date(), "yyyy-MM-dd"),
        examdate: examdate,
    };

    try {
        const res = await authAxios.post(`/register`, data, {
            withCredentials: true,
        });
        let response = [];

        if (!res) {
            const secondRes = await axios.post(
                `${process.env.REACT_APP_API_URL}/register`,
                data,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            response = await secondRes;
        } else {
            response = await res;
        }

        console.log(response.data);
        dataUpdate(response.data);
        successStatus(true);
        setTimeout(() => {
            successStatus(false);
        }, 5000);
    } catch (error) {
        console.log(error);
        failureStatus(true);
        setTimeout(() => {
            failureStatus(false);
        }, 10000);
    }
};

export default RegisterCourse;