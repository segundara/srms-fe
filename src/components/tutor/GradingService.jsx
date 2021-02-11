import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const GradingService = async (grade, studentid, examid, openGradeModal) => {

    const data = {
        grade: grade,
    };

    try {
        const res = await authAxios.put(`/exams/${studentid}/${examid}`, data, {
            withCredentials: true,
        });

        let response = [];

        if (!res) {
            const secondRes = await axios.put(
                `${process.env.REACT_APP_API_URL}/exams/${studentid}/${examid}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                    withCredentials: true,
                }
            );
            response = secondRes.data;
        } else {
            response = res.data;
        }

        console.log("response from gradeUpdate=>", response);

        openGradeModal(false);
    } catch (err) {
        if (err.response.status === 500) {
            console.log("There was a problem with the server");
        } else {
            console.log(err.response.data.msg);
        }
        openGradeModal(false);
    }
};

export default GradingService;