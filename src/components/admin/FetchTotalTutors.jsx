import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import Pages from "../common/Pages"

const TotalTutors = async (userTitle, perPage, setTotalPages) => {
    try {
        const res = await authAxios.get(`/tutor`, { withCredentials: true });
        let tutors = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/tutor`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            tutors = secondRes.data;
        } else {
            tutors = res.data;
        }
        // getTotal(tutors.count);
        Pages(tutors.count, perPage, setTotalPages, userTitle);
    } catch (error) {
        console.log(error);
    }
};

export default TotalTutors;