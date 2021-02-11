import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const UpdateProfileText = async (userTitle, firstname, lastname, email, dateofbirth, nationality, updateUser, setModalForText) => {

    let data = {};

    if (userTitle === "student") {
        data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            dateofbirth: dateofbirth,
            nationality: nationality,
        };
    }
    else {
        data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
        };
    }


    try {
        const res = await authAxios.put(`/${userTitle}/me`, data, {
            withCredentials: true,
        });

        let response = [];

        if (!res) {
            const secondRes = await axios.put(
                `${process.env.REACT_APP_API_URL}/${userTitle}/me`,
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

        console.log(response);
        updateUser(response);
        setModalForText(false);
    } catch (err) {
        if (err.response.status === 500) {
            console.log("There was a problem with the server");
        } else {
            console.log(err.response.data.msg);
        }
        setModalForText(false);
    }
}

export default UpdateProfileText
