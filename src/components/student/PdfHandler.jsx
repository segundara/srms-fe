import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import download from "downloadjs";

const RecordsPDF = async (userID, successStatus, failureStatus) => {
    try {
        const res = await authAxios.get(`/exams/${userID}/pdf`, {
            responseType: "blob",
            withCredentials: true,
        });
        let result = [];

        if (!res) {
            const secondRes = await axios.get(
                `${process.env.REACT_APP_API_URL}/exams/${userID}/pdf`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    responseType: "blob",
                    withCredentials: true,
                }
            );
            result = await secondRes;
        } else {
            result = await res;
        }
        const content = result.headers["content-type"];
        download(result.data, "Transcript", content);

        successStatus(true);
        setTimeout(() => {
            successStatus(false);
        }, 5000);
    } catch (error) {
        console.log(error);
        failureStatus(true);
        setTimeout(() => {
            failureStatus(false);
        }, 5000);
    }
};

export default RecordsPDF;