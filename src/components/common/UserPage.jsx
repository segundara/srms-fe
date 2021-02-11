import React, { useState, useEffect } from 'react';
import authAxios from "../../lib/http"
import Cookies from "js-cookie"
import axios from "axios"
import "../commonStyle/style.scss";
import StudentDetail from '../student/Student';
import TutorDetail from '../tutor/Tutor';
import AdminDetail from '../admin/Admin';

const UserData = ({ userTitle }) => {
    const [currentUser, setCurrentUser] = useState('');
    const [userData, setUserData] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authAxios.get(`/${userTitle}/me`, { withCredentials: true })
                let currentUser = []

                if (!res) {
                    const secondRes = await axios.get(`${process.env.REACT_APP_API_URL}/${userTitle}/me`, {
                        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
                        withCredentials: true,
                    })
                    currentUser = secondRes.data
                } else {
                    currentUser = res.data
                }

                setCurrentUser(currentUser)
                setLoading(false)
                console.log(currentUser)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, []);

    const updateUser = (newInfo) => { setCurrentUser(newInfo) }
    const updateData = (newData) => { setUserData(newData) }

    return (
        <>
            {currentUser && (
                userTitle === "student"
                    ? (
                        <StudentDetail
                            userTitle={userTitle}
                            currentUser={currentUser}
                            updateUserInfo={updateUser}
                            userData={userData}
                            updateData={updateData}
                        />
                    )
                    : (userTitle === "tutor"
                        ? (<TutorDetail
                            userTitle={userTitle}
                            currentUser={currentUser}
                            updateUserInfo={updateUser}
                        />
                        )
                        : (<AdminDetail
                            userTitle={userTitle}
                            currentUser={currentUser}
                            updateUserInfo={updateUser}
                        />)
                    )
            )}
        </>
    )
}
export default UserData