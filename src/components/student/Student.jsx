import React from "react";
import {
  Accordion,
  Button,
  Table,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";
import Profile from "../common/Profile";
import AllCourses from "./Courses";
import MyCourses from "./Registered";
import ExamsGrades from "./ExamsGrades";
import "../commonStyle/style.scss";
import { format } from "date-fns";
import CustomToggle from "../common/CustomToggle";

const StudentDetail = ({
  userTitle,
  currentUser,
  updateUserInfo,
  updateData,
  userData,
}) => {
  const updateUser = (newInfo) => updateUserInfo(newInfo);
  const getData = (newData) => updateData(newData);

  return (
    <>
      {currentUser && (
        <>
          <Row className="mt-4 mb-2">
            <Col md={3} className="text-center mb-3">
              {currentUser && currentUser.image ? (
                <Image
                  src={currentUser.image}
                  className="img-fluid rounded-circle"
                  alt="profile"
                />
              ) : (
                  <Image
                    src="https://img.icons8.com/officel/2x/user.png"
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                )}
              <h3 className="mt-3 mb-0">
                {currentUser.firstname} {currentUser.lastname}
              </h3>
              <strong>{currentUser.email}</strong>
            </Col>
            <Col md={9} className="d-flex flex-column justify-content-center">
              <h1 className="pageTitle">
                {userTitle.charAt(0).toUpperCase() +
                  userTitle.slice(1)}{" "}
              Dashboard
            </h1>
              <Accordion defaultActiveKey="1">
                <Card className="accordion-card">
                  <CustomToggle as={Card.Header} eventKey="0">
                    My Account
                  </CustomToggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <>
                        <Table responsive="sm">
                          <thead>
                            <tr>
                              <th className="text-left" colSpan="2">
                                Profile Detail
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>First Name</td>
                              <td>
                                <strong>{currentUser.firstname}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>Last Name</td>
                              <td>
                                <strong>{currentUser.lastname}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>
                                <strong>{currentUser.email}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>D.O.B</td>
                              <td>
                                <strong>
                                  {format(
                                    new Date(currentUser.dateofbirth),
                                    "yyyy-MM-dd"
                                  )}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td>Nationality</td>
                              <td>
                                <strong>{currentUser.nationality}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <Profile
                          currentUser={currentUser}
                          updateUser={updateUser}
                          userTitle={userTitle}
                        />
                      </>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className="accordion-card">
                  <CustomToggle as={Card.Header} eventKey="1">
                    Available Courses
                  </CustomToggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <AllCourses
                        userID={currentUser._id}
                        updateData={getData}
                        userTitle={userTitle}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className="accordion-card">
                  <CustomToggle as={Card.Header} eventKey="2">
                    My Course List
                  </CustomToggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <MyCourses
                        userID={currentUser._id}
                        updateData={userData}
                        userTitle={userTitle}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className="accordion-card">
                  <CustomToggle as={Card.Header} eventKey="3">
                    My Exams/Grades
                  </CustomToggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <ExamsGrades
                        userID={currentUser._id}
                        updateData={userData}
                        userTitle={userTitle}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default StudentDetail;
