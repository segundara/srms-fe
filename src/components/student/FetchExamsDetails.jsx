import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const ExamsDetails = async (loadingStatus, currentPage, perPage, setDetails, userID) => {
    loadingStatus(true);
    try {
        const skip = currentPage * perPage - perPage;
        const res = await authAxios.get(
            `/exams/${userID}?limit=${perPage}&offset=${skip}`,
            { withCredentials: true }
        );
        let examInfo = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/exams/${userID}?limit=${perPage}&offset=${skip}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            examInfo = secondRes.data;
        } else {
            examInfo = res.data;
        }

        setDetails(examInfo.data);
        loadingStatus(false);
    } catch (error) {
        console.log(error);
    }
};

export default ExamsDetails;