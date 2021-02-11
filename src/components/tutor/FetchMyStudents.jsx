import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";
import MyCourses from "./FetchMyCourses";

const MyStudents = async (userID, currentPage, perPage, getStudents, loadingStatus) => {
    loadingStatus(true);
    let allStudents = [];
    const courses = await MyCourses(userID);
    if (courses) {
        for (const course of courses) {
            let student = [];
            let eachList = {};

            try {
                const skip = currentPage * perPage - perPage;
                const res = await authAxios.get(
                    `/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
                    { withCredentials: true }
                );

                if (!res) {
                    const secondRes = await axios.get(
                        `${process.env.REACT_APP_API_URL}/register/student_list/${course._id}?limit=${perPage}&offset=${skip}`,
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
                eachList.name = course.name;
                eachList.students = student.data;
                console.log(student);
                allStudents.push(eachList);
            } catch (error) {
                console.log(error);
            }
        }
        getStudents(allStudents);
    }
    loadingStatus(false);
};

export default MyStudents;