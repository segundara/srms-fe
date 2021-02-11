import React from "react";
import { Container } from "react-bootstrap";
import "../commonStyle/style.scss";
import UserData from "./UserPage";

const Dashboard = (props) => {

  const loggedInTitle = localStorage.getItem("userTitle");

  return (
    <>
      {loggedInTitle ? (
        <>
          <Container className="mt-3">
            <UserData userTitle={JSON.parse(loggedInTitle)} />
          </Container>
        </>
      ) : (
          props.history.push('/')
        )}
    </>
  );
};
export default Dashboard;
