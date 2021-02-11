import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const CoursesDetails = async (loadingStatus, currentPage, perPage, setDetails) => {
    loadingStatus(true);
    try {
        const skip = currentPage * perPage - perPage;
        const res = await authAxios.get(
            `/courses?limit=${perPage}&offset=${skip}`,
            { withCredentials: true }
        );
        let allCourses = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/courses?limit=${perPage}&offset=${skip}`,
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

export default CoursesDetails;