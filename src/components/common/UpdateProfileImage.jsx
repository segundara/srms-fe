import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const UpdateProfileImage = async (userTitle, image, updateUser, setModalForImage) => {

    const formData = new FormData();
    formData.append("file", image);

    try {
        const res = await authAxios.post(`/${userTitle}/upload/me`, formData, {
            withCredentials: true,
        });
        let response = [];

        if (!res) {
            const secondRes = await axios.post(
                `${process.env.REACT_APP_API_URL}/${userTitle}/upload/me`,
                formData,
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
        setModalForImage(false);
    } catch (err) {
        if (err.response.status === 500) {
            console.log("There was a problem with the server");
        } else {
            console.log(err.response.data.msg);
        }
        setModalForImage(false);
    }
}

export default UpdateProfileImage
