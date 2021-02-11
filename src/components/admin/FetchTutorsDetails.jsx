import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const TutorsDetails = async (loadingStatus, currentPage, perPage, setDetails) => {
    loadingStatus(true);
    try {
        const skip = currentPage * perPage - perPage;
        const res = await authAxios.get(
            `/tutor?limit=${perPage}&offset=${skip}`,
            { withCredentials: true }
        );
        let allTutors = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/tutor?limit=${perPage}&offset=${skip}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            allTutors = secondRes.data;
        } else {
            allTutors = res.data;
        }

        setDetails(allTutors.data);
        loadingStatus(false);
    } catch (error) {
        console.log(error);
    }
};

export default TutorsDetails;