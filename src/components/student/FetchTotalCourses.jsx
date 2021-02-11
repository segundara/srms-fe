import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import Pages from "../common/Pages"

const TotalCourses = async (userTitle, getTotal, perPage, setTotalPages) => {
    try {
        const res = await authAxios.get(`/courses`, { withCredentials: true });
        let allCourses = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/courses`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            allCourses = secondRes.data;
        } else {
            allCourses = res.data;
        }
        getTotal(allCourses.count);
        Pages(allCourses.count, perPage, setTotalPages, userTitle);
    } catch (error) {
        console.log(error);
    }
};

export default TotalCourses;