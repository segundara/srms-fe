import React, { useState, useEffect } from "react";
import {
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import "../commonStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";
import TotalRegisteredCourses from "./FetchTotalRegisteredCourses";
import MyCourseList from "./FetchMyCourseList";

const MyCourses = ({ userID, updateData, userTitle }) => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const setTotalPages = (pages) => setPageNumbers(pages);
  const loadingStatus = (value) => setLoading(value);
  const setDetails = (details) => setData(details);

  const changePage = (value) => setCurrentPage(value);

  useEffect(() => {
    TotalRegisteredCourses(userID, userTitle, perPage, setTotalPages);
    MyCourseList(loadingStatus, currentPage, perPage, setDetails, userID);
  }, [updateData, currentPage, perPage, userTitle, userID]);

  return (
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
                <th>Course Name</th>
                <th>Description</th>
                <th>Semester</th>
                <th>Registration Date</th>
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
                    <td>{course.reg_date.slice(0, 10)}</td>
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
        </>
      )}
      {!loading && data.length < 1 && (
        <div className="text-center" colSpan="5">
          <strong>No record at the moment</strong>
        </div>
      )}
    </div>
  );
};
export default MyCourses;
