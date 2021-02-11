import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../commonStyle/style.scss";
import TextModal from "./TextModal";
import ImageModal from "./ImageModal";
import UpdateProfileText from "./UpdateProfileText";
import UpdateProfileImage from "./UpdateProfileImage";

const Profile = ({ userTitle, currentUser, updateUser }) => {
    const [profileText, setProfileText] = useState(false);
    const [profileImage, setProfileImage] = useState(false);
    const [image, setImage] = useState(null);
    const [firstname, setFirstname] = useState(currentUser.firstname);
    const [lastname, setLastname] = useState(currentUser.lastname);
    const [email, setEmail] = useState(currentUser.email);
    const [dateofbirth, setDateofbirth] = useState(currentUser.dateofbirth);
    const [nationality, setNationality] = useState(currentUser.nationality);

    const saveImg = (event) => setImage(event.target.files[0]);

    const setModalForText = (value) => setProfileText(value);
    const setModalForImage = (value) => setProfileImage(value);
    const set_F_Name = (name) => setFirstname(name);
    const set_L_Name = (name) => setLastname(name);
    const set_Email = (text) => setEmail(text);
    const set_DOB = (value) => setDateofbirth(value);
    const set_Nationality = (value) => setNationality(value);

    const onProfileTextUpdate = (e) => {
        e.preventDefault();
        UpdateProfileText(userTitle, firstname, lastname, email, dateofbirth, nationality, updateUser, setModalForText);
    }

    const onProfileImageUpdate = (e) => {
        e.preventDefault();
        UpdateProfileImage(userTitle, image, updateUser, setModalForImage);
    };

    return (
        <>
            <Button
                className="mb-1"
                variant="secondary"
                onClick={() => setProfileText(true)}
            >
                Update Profile Text
            </Button>{" "}

            <Button
                className="mb-1"
                variant="secondary"
                onClick={() => setProfileImage(true)}
            >
                Update Profile Image
            </Button>{" "}

            <TextModal
                userTitle={userTitle}
                profileText={profileText}
                setModalForText={setModalForText}
                updateProfileText={onProfileTextUpdate}
                firstname={firstname}
                set_F_Name={set_F_Name}
                lastname={lastname}
                set_L_Name={set_L_Name}
                email={email}
                set_Email={set_Email}
                dob={dateofbirth}
                set_DOB={set_DOB}
                nationality={nationality}
                set_Nationality={set_Nationality}
            />
            <ImageModal
                profileImage={profileImage}
                setModalForImage={setModalForImage}
                updateProfileImage={onProfileImageUpdate}
                saveImg={saveImg}
            />
        </>
    );
};

export default Profile;
