import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import Pages from "../common/Pages"

const TotalStudents = async (userTitle, getTotal, perPage, setTotalPages) => {
    try {
        const res = await authAxios.get(`/student`, { withCredentials: true });
        let students = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/student`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            students = secondRes.data;
        } else {
            students = res.data;
        }
        getTotal(students.count);
        Pages(students.count, perPage, setTotalPages, userTitle);
    } catch (error) {
        console.log(error);
    }
};

export default TotalStudents;