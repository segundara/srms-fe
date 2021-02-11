import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const DepartmentsDetails = async (getDepartments) => {
    try {
        const response = await authAxios.get(`/departments`, {
            withCredentials: true,
        });
        let allDepartments = [];

        if (!response) {
            const secondResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/departments`,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            allDepartments = secondResponse.data;
        } else {
            allDepartments = response.data;
        }
        getDepartments(allDepartments.data);
    } catch (error) {
        console.log(error);
    }
};

export default DepartmentsDetails;