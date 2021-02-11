import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const Tutors = async (getTutors) => {
    try {
        const response = await authAxios.get(`/tutor`, { withCredentials: true });
        let allTutors = [];

        if (!response) {
            const secondResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/tutor`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            allTutors = secondResponse.data;
        } else {
            allTutors = response.data;
        }

        getTutors(allTutors.data);
    } catch (error) {
        console.log(error);
    }
};

export default Tutors;