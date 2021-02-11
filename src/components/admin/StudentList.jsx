import React, { useState, useEffect } from "react";
import "../commonStyle/style.scss";
import {
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import Pagination from "react-bootstrap-4-pagination";
import NewStudent from "./NewStudentHandler";
import TotalStudents from "./FetchTotalStudents";
import DepartmentsDetails from "./FetchDepartmentsDetails";
import StudentsDetails from "./FetchStudentsDetails";

const StudentList = ({ userTitle }) => {
  const [data, setData] = useState(null);
  const [newModal, setNewModal] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [password, setPassword] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedID, setSelectedID] = useState("");
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  const setTotalPages = (pages) => setPageNumbers(pages);
  const successStatus = (value) => setSuccess(value);
  const failureStatus = (value) => setFailure(value);
  const newStudentModal = (value) => setNewModal(value);
  const loadingStatus = (value) => setLoading(value);
  const setDetails = (details) => setData(details);
  const getDepartments = (items) => setDepartments(items);

  const registerStudent = async (e) => {
    e.preventDefault();
    NewStudent(firstname, lastname, email, dateofbirth, nationality, selectedID, password, newStudentModal, successStatus, failureStatus);
  };

  const changePage = (value) => setCurrentPage(value);
  const getSelectedID = (e) => setSelectedID(e.target.value);

  useEffect(() => {
    TotalStudents(userTitle, perPage, setTotalPages);
    DepartmentsDetails(getDepartments);
    StudentsDetails(loadingStatus, currentPage, perPage, setDetails);
  }, [success, currentPage, perPage, userTitle]);

  return (
    <>
      <div>
        <Alert variant="info" show={success}>
          <strong>Student successfully registered</strong>
        </Alert>
        <Alert variant="danger" show={failure}>
          <strong>Something went wrong!!!</strong>
        </Alert>
      </div>
      <div>
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
        {!loading && data && pageNumbers.length > 0 && (
          <>
            <Table responsive="sm" size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody>
                {data.map((student, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {currentPage > 1
                          ? (i = i + 1 + perPage * currentPage - perPage)
                          : (i = i + 1)}
                      </td>
                      <td>{student.firstname}</td>
                      <td>{student.lastname}</td>
                      <td>{student.email}</td>
                      <td>{student.nationality}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between pl-3">

              <Pagination
                threeDots
                totalPages={pageNumbers.length}
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
                <strong>{pageNumbers.length}</strong>
              </Alert>
            </div>
            <Button variant="secondary" onClick={() => setNewModal(true)}>
              Register New Student
            </Button>{" "}
            <Modal
              size="lg"
              show={newModal}
              onHide={() => setNewModal(false)}
              aria-labelledby="example-modal-sizes-title-sm"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  Add New Student
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="d-flex flex-column" onSubmit={registerStudent}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="firstname">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                          type="text"
                          required={true}
                          placeholder="What is firstname.."
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="lastname">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control
                          type="text"
                          required={true}
                          placeholder="What is lastname.."
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          required={true}
                          placeholder="Email here.."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="dateofbirth">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          required={true}
                          placeholder="Date of Birth..."
                          value={dateofbirth}
                          onChange={(e) => setDateofbirth(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="nationality">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control
                          type="text"
                          required={true}
                          placeholder="Nationality..."
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          required={true}
                          placeholder="Password..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="departments">
                        <Form.Label>Select Department</Form.Label>
                        <Form.Control
                          as="select"
                          defaultValue=""
                          required
                          onChange={getSelectedID}
                        >
                          <option></option>
                          {departments.map((key, i) => {
                            return (
                              <option key={i} value={key._id}>
                                {key.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      className="align-self-center mr-4"
                      variant="warning"
                      type="submit"
                    >
                      Add Student
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
        {!loading && !data && (
          <p className="text-center">
            <strong>No information yet</strong>
          </p>
        )}
      </div>
    </>
  );
};

export default StudentList;
