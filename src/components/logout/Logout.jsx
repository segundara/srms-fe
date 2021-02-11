import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import authAxios from "../../lib/http"
import { withRouter } from 'react-router-dom';

const Logout = (props) => {

    useEffect(() => {
        const logout = async () => {
            try {
                const res = await authAxios.post(`/users/logout`, {}, { withCredentials: true })
                let response = []

                if (!res) {
                    const secondRes = await axios.post(`${process.env.REACT_APP_API_URL}/users/logout`, {}, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    response = await secondRes
                }
                else {
                    response = await res
                }

                if (response.status === 200) {
                    props.history.push('/');
                    localStorage.clear();
                }

            } catch (error) {
                console.log(error)
            }

        }
        logout()
    }, [])

    return (
        <div className="text-center qoute">
            You already logged out. Please <a href="/login">Login</a> again to continue.
        </div>
    );
}

export default withRouter(Logout)