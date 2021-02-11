import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Tab,
  Nav,
  Table,
  Badge,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import "../commonStyle/style.scss";
import { format } from "date-fns";
import Pagination from "react-bootstrap-4-pagination";
import TotalStudentsByExam from "./FetchTotalStudentsByExam";
import GradingService from "./GradingService";
import ExamsRecords from "./FetchExamsRecords";

function ExamsGrades({ userID, userTitle }) {
  const [data, setData] = useState([]);
  const [grade, setGrade] = useState("");
  const [gradeModal, setGradeModal] = useState(false);
  const [examid, setExamid] = useState("");
  const [studentid, setStudentid] = useState("");
  const [totalArr, setTotalArr] = useState([]);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const setTotalStudent = (items) => setTotalArr(items);
  const setTotalPages = (pages) => setPageNumbers(pages);
  const openGradeModal = (value) => setGradeModal(value);
  const loadingStatus = (value) => setLoading(value);
  const changePage = (value) => setCurrentPage(value);
  const getRecords = (records) => setData(records);

  const updateGrade = async (e) => {
    e.preventDefault();
    GradingService(grade, studentid, examid, openGradeModal)
  };

  useEffect(() => {
    TotalStudentsByExam(userID, perPage, setTotalStudent, setTotalPages, userTitle);
    ExamsRecords(userID, currentPage, perPage, getRecords, loadingStatus);
  }, [gradeModal, currentPage, perPage, userID, userTitle]);

  console.log(data);
  return (
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
                                  <th>Exam date</th>
                                  <th>Grade</th>
                                  <th>Upload Grade</th>
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
                                      <td>
                                        {format(
                                          new Date(s.examdate),
                                          "yyyy-MM-dd"
                                        )}
                                      </td>
                                      <td className="text-center">{s.grade}</td>
                                      <td className="text-center">
                                        <Button
                                          variant="secondary"
                                          onClick={() => {
                                            setGradeModal(true);
                                            setExamid(s._id);
                                            setStudentid(s.studentid);
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </td>
                                      <Modal
                                        size="sm"
                                        show={gradeModal}
                                        onHide={() => setGradeModal(false)}
                                        aria-labelledby="example-modal-sizes-title-sm"
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title id="example-modal-sizes-title-sm">
                                            Update Grade
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <Form
                                            className="d-flex flex-column"
                                            onSubmit={updateGrade}
                                          >
                                            <Row>
                                              <Col md={6}>
                                                <Form.Group controlId="grade">
                                                  <Form.Label>Grade</Form.Label>
                                                  <Form.Control
                                                    type="text"
                                                    required={true}
                                                    placeholder="Enter Grade"
                                                    value={grade}
                                                    onChange={(e) =>
                                                      setGrade(e.target.value)
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
                                                Update Grade
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
  );
}

export default ExamsGrades;
