import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const StudentsDetails = async (loadingStatus, currentPage, perPage, setDetails) => {
    loadingStatus(true);
    try {
        const skip = currentPage * perPage - perPage;
        const res = await authAxios.get(
            `/student?limit=${perPage}&offset=${skip}`,
            { withCredentials: true }
        );
        let allStudents = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/student?limit=${perPage}&offset=${skip}`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            allStudents = secondRes.data;
        } else {
            allStudents = res.data;
        }
        setDetails(allStudents.data);
        loadingStatus(false);
    } catch (error) {
        console.log(error);
    }
};

export default StudentsDetails;