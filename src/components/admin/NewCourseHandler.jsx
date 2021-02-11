import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const NewCourse = async (courseName, description, semester, lecturerID, examdate, newCourseModal, successStatus, failureStatus) => {
    const data = {
        name: courseName,
        description: description,
        semester: semester,
        lecturerid: lecturerID,
        examdate: examdate,
    };

    try {
        const res = await authAxios.post(`/courses`, data, {
            withCredentials: true,
        });
        let response = [];

        if (!res) {
            const secondRes = await axios.post(
                `${process.env.REACT_APP_API_URL}/courses`,
                data,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            response = await secondRes.data;
        } else {
            response = await res.data;
        }

        console.log("New course added=> ", response);
        newCourseModal(false);
        successStatus(true);
        setTimeout(() => {
            successStatus(false);
        }, 5000);
    } catch (error) {
        console.log(error);
        newCourseModal(false);
        failureStatus(true);
        setTimeout(() => {
            failureStatus(false);
        }, 10000);
    }
};

export default NewCourse;