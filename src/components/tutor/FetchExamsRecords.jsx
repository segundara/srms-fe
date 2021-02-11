import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import MyCourses from "./FetchMyCourses";

const ExamsRecords = async (userID, currentPage, perPage, getRecords, loadingStatus) => {
    loadingStatus(true);
    let allStudents = [];
    const courses = await MyCourses(userID);
    if (courses) {
        for (const course of courses) {
            let student = [];
            let eachRecord = {};
            try {
                const skip = currentPage * perPage - perPage;
                const res = await authAxios.get(
                    `/exams/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
                    { withCredentials: true }
                );

                if (!res) {
                    const secondRes = await axios.get(
                        `${process.env.REACT_APP_API_URL}/exams/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
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
                eachRecord.name = course.name;
                eachRecord.students = student.data;
                console.log(student);
                allStudents.push(eachRecord);
            } catch (error) {
                console.log(error);
            }
        }
        getRecords(allStudents);
    }
    loadingStatus(false);
};

export default ExamsRecords;