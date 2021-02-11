import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  Tab,
  Nav,
  Table,
  Badge,
  Alert,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import "../commonStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";
import TotalStudentsBycourse from "./FetchTotalStudentsByCourse";
import MyStudents from "./FetchMyStudents";
import EmailService from "./EmailService";

const StudentList = ({ userID, userTitle }) => {
  const [data, setData] = useState([]);
  const [totalArr, setTotalArr] = useState([]);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [emailModal, setEmailModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  const setTotalStudent = (items) => setTotalArr(items);
  const openEmailModal = (value) => setEmailModal(value);
  const successStatus = (value) => setSuccess(value);
  const failureStatus = (value) => setFailure(value);
  const loadingStatus = (value) => setLoading(value);

  const setTotalPages = (pages) => setPageNumbers(pages);
  const changePage = (value) => setCurrentPage(value);
  const getStudents = (students) => setData(students);

  const sendEmail = async (e) => {
    e.preventDefault();
    EmailService(recipientEmail, emailSubject, emailContent, openEmailModal, successStatus, failureStatus);
  };

  useEffect(() => {
    TotalStudentsBycourse(userID, perPage, setTotalStudent, setTotalPages, userTitle);
    MyStudents(userID, currentPage, perPage, getStudents, loadingStatus);
  }, [currentPage, perPage, userID]);

  console.log(data.length, data);
  return (
    <>
      <div>
        <Alert variant="info" show={success}>
          <strong>Message sent!</strong>
        </Alert>
        <Alert variant="danger" show={failure}>
          <strong>Something went wrong!!!</strong>
        </Alert>
      </div>
      <div>
        {data && data.length > 0 && (
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="0"
            onSelect={() => changePage(1)}
          >
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {data.map((course, i) => {
                    return (
                      <Nav.Item key={i}>
                        <Nav.Link
                          eventKey={i}
                          className="d-flex justify-content-between btn-link px-1"
                        >
                          <small>
                            <b>{course.name}</b>
                          </small>
                          <Badge variant="light">
                            <span>{totalArr[i]}</span>
                          </Badge>
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {data.map((list, i) => {
                    return (
                      <Tab.Pane key={i} eventKey={i}>
                        {loading && (
                          <div
                            style={{
                              width: "10%",
                              height: "auto",
                              margin: "auto",
                            }}
                          >
                            <Spinner animation="border" variant="dark" />
                          </div>
                        )}
                        {!loading &&
                          list.students.length > 0 &&
                          pageNumbers &&
                          pageNumbers.length > 0 && (
                            <>
                              <Table responsive="sm" size="sm">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    {/* <th>Email</th> */}
                                    <th>Message</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {list.students.map((s, i) => {
                                    return (
                                      <tr key={i}>
                                        <td>
                                          {currentPage > 1
                                            ? (i =
                                              i +
                                              1 +
                                              perPage * currentPage -
                                              perPage)
                                            : (i = i + 1)}
                                        </td>
                                        <td>{s.firstname}</td>
                                        <td>{s.lastname}</td>
                                        {/* <td>{s.email}</td> */}
                                        <td className="text-center">
                                          <Button
                                            variant="secondary"
                                            onClick={() => (
                                              setEmailModal(true),
                                              setRecipientEmail(s.email),
                                              setRecipientFirstName(s.firstname),
                                              setRecipientLastName(s.lastname)
                                            )}
                                          >
                                            <FontAwesomeIcon icon={faEnvelope} />
                                          </Button>
                                        </td>
                                        <Modal
                                          size="md"
                                          show={emailModal}
                                          onHide={() => setEmailModal(false)}
                                          aria-labelledby="example-modal-sizes-title-sm"
                                        >
                                          <Modal.Header closeButton>
                                            <Modal.Title id="example-modal-sizes-title-sm">
                                              Sending Email To {recipientFirstName} {recipientLastName}
                                            </Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                            <Form
                                              className="d-flex flex-column"
                                              onSubmit={sendEmail}
                                            >
                                              <Row>
                                                <Col md={12}>
                                                  <Form.Group controlId="subject">
                                                    <Form.Label>
                                                      Subject
                                                  </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      required={true}
                                                      placeholder="Enter Subject"
                                                      value={emailSubject}
                                                      onChange={(e) =>
                                                        setEmailSubject(
                                                          e.target.value
                                                        )
                                                      }
                                                    />
                                                  </Form.Group>
                                                  <Form.Group controlId="content">
                                                    <Form.Label>
                                                      Content
                                                  </Form.Label>
                                                    <Form.Control
                                                      as="textarea"
                                                      rows={3}
                                                      required={true}
                                                      placeholder="Enter Content"
                                                      value={emailContent}
                                                      onChange={(e) =>
                                                        setEmailContent(
                                                          e.target.value
                                                        )
                                                      }
                                                    />
                                                  </Form.Group>
                                                </Col>
                                              </Row>
                                              <div className="d-flex justify-content-center">
                                                <Button
                                                  className="align-self-center mr-4"
                                                  variant="warning"
                                                  type="submit"
                                                >
                                                  Send
                                              </Button>
                                              </div>
                                            </Form>
                                          </Modal.Body>
                                        </Modal>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </Table>
                              <div className="d-flex justify-content-between pl-3">

                                <Pagination
                                  threeDots
                                  totalPages={pageNumbers[i].length}
                                  currentPage={currentPage}
                                  showMax={2}
                                  prevNext
                                  activeBgColor="#504c8a"
                                  color="#504c8a"
                                  activeBorderColor="#504c8a"
                                  onClick={(page) => changePage(page)}
                                />

                                <Alert variant="light" className="text-right">
                                  page <strong>{currentPage}</strong> of{" "}
                                  <strong>{pageNumbers[i].length}</strong>
                                </Alert>
                              </div>
                            </>
                          )}
                        {!loading && list.students.length < 1 && (
                          <p className="text-center">
                            <strong>No student in this course</strong>
                          </p>
                        )}
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        )}
        {!loading && data.length < 1 && (
          <p className="text-center">
            <strong>No record at the moment!</strong>
          </p>
        )}
      </div>
    </>
  );
};

export default StudentList;
