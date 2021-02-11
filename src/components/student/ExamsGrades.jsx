import React, { useState, useEffect } from "react";
import {
  Table,
  Alert,
  Button,
  Spinner,
} from "react-bootstrap";
import "../commonStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";
import TotalExams from "./FetchTotalExams";
import ExamsDetails from "./FetchExamsDetails";
import RecordsPDF from "./PdfHandler";

const ExamsGrades = ({ userID, updateData, userTitle }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTotal = (total) => setTotal(total);
  const setTotalPages = (pages) => setPageNumbers(pages);
  const successStatus = (value) => setSuccess(value);
  const failureStatus = (value) => setFailure(value);
  const loadingStatus = (value) => setLoading(value);
  const setDetails = (details) => setData(details);

  const changePage = (value) => setCurrentPage(value);

  const getPDF = () => {
    RecordsPDF(userID, successStatus, failureStatus);
  };

  useEffect(() => {
    TotalExams(userID, userTitle, getTotal, perPage, setTotalPages);
    ExamsDetails(loadingStatus, currentPage, perPage, setDetails, userID);
  }, [updateData, currentPage, perPage, userID, userTitle]);

  console.log(data);

  return (
    <>
      <div>
        <Alert variant="info" show={success}>
          <strong>Record downloaded</strong>
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
        {!loading && data && data.length > 0 && pageNumbers.length > 0 && (
          <>
            <Table responsive="sm" size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Name</th>
                  <th>Description</th>
                  <th>Semester</th>
                  <th>Exam Date</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {data.map((course, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {currentPage > 1
                          ? (i = i + 1 + perPage * currentPage - perPage)
                          : (i = i + 1)}
                      </td>
                      <td>{course.name}</td>
                      <td>{course.description}</td>
                      <td>{course.semester}</td>
                      <td>{course.examdate.slice(0, 10)}</td>
                      <td>{course.grade}</td>
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
            <Button variant="secondary" onClick={getPDF}>
              Download Transcript
            </Button>{" "}
          </>
        )}
        {!loading && data.length < 1 && (
          <div className="text-center">
            <strong>No record at the moment</strong>
          </div>
        )}
      </div>
    </>
  );
};
export default ExamsGrades;
