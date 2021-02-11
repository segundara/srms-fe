import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const MyCourses = async (userID) => {
    try {
        const res = await authAxios.get(`/courses/${userID}`, {
            withCredentials: true,
        });
        let allCourses = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/courses/${userID}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            allCourses = secondRes.data;
        } else {
            allCourses = res.data;
        }
        return allCourses;
    } catch (error) {
        console.log(error);
    }
};

export default MyCourses;