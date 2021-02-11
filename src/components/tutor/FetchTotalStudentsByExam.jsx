import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import MyCourses from "./FetchMyCourses";
import Pages from "../common/Pages"

const TotalStudentsByExam = async (userID, perPage, setTotalStudent, setTotalPages, userTitle) => {
    const courses = await MyCourses(userID);
    let totalStudent = [];
    if (courses) {
        for (const course of courses) {
            let student = [];
            try {
                const res = await authAxios.get(`/exams/student_list/${course._id}`, {
                    withCredentials: true,
                });

                if (!res) {
                    const secondRes = await axios.get(
                        `${process.env.REACT_APP_API_URL}/exams/student_list/${course._id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${Cookies.get("accessToken")}`,
                            },
                            withCredentials: true,
                        }
                    );
                    student = secondRes.data;
                } else {
                    student = res.data;
                }
                totalStudent.push(student.count);
            } catch (error) {
                console.log(error);
            }
        }
    }
    setTotalStudent(totalStudent);
    Pages(totalStudent, perPage, setTotalPages, userTitle);
};

export default TotalStudentsByExam;