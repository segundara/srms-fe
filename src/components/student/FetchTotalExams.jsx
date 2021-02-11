import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import Pages from "../common/Pages"

const TotalExams = async (userID, userTitle, perPage, setTotalPages) => {
    try {
        const res = await authAxios.get(`/exams/${userID}`, {
            withCredentials: true,
        });
        let exams = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/exams/${userID}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            exams = secondRes.data;
        } else {
            exams = res.data;
        }
        // getTotal(exams.count);
        Pages(exams.count, perPage, setTotalPages, userTitle);
    } catch (error) {
        console.log(error);
    }
};

export default TotalExams;