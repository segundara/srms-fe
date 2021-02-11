import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const MyCourseList = async (loadingStatus, currentPage, perPage, setDetails, userID) => {
    loadingStatus(true);
    try {
        const skip = currentPage * perPage - perPage;
        const res = await authAxios.get(
            `/register/course_list/${userID}?limit=${perPage}&offset=${skip}`,
            { withCredentials: true }
        );
        let allCourses = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/register/course_list/${userID}?limit=${perPage}&offset=${skip}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            allCourses = secondRes.data;
        } else {
            allCourses = res.data;
        }

        setDetails(allCourses.data);
        loadingStatus(false);
    } catch (error) {
        console.log(error);
    }
};

export default MyCourseList;