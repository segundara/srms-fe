import authAxios from "../../lib/http";
import Cookies from "js-cookie";
import axios from "axios";

const EmailService = async (recipientEmail, emailSubject, emailContent, openEmailModal, successStatus, failureStatus) => {

    const data = {
        recipient: recipientEmail,
        subject: emailSubject,
        content: emailContent,
    };
    console.log(data);
    try {
        const res = await authAxios.post(`/tutor/email/ToStudent`, data, {
            withCredentials: true,
        });
        let response;

        if (!res) {
            const secondRes = await axios.post(
                `${process.env.REACT_APP_API_URL}/tutor/email/ToStudent`,
                data,
                {
                    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                    withCredentials: true,
                }
            );
            response = secondRes;
        } else {
            response = res;
        }
        console.log(response.data);
        openEmailModal(false);
        successStatus(true);
        setTimeout(() => {
            successStatus(false);
        }, 5000);
    } catch (error) {
        console.log(error);
        openEmailModal(false);
        failureStatus(true);
        setTimeout(() => {
            failureStatus(false);
        }, 10000);
    }
};

export default EmailService;