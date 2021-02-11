import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";
import "../commonStyle/style.scss";
import Pagination from "react-bootstrap-4-pagination";
import TotalCourses from "./FetchTotalCourses";
import RegisterCourse from "./RegisterCourseHandler";
import CoursesDetails from "./FetchCoursesDetails";

const AllCourses = ({ userID, updateData, userTitle }) => {
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [perPage, setPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const setTotalPages = (pages) => setPageNumbers(pages);
  const dataUpdate = (data) => updateData(data);
  const successStatus = (value) => setSuccess(value);
  const failureStatus = (value) => setFailure(value);
  const loadingStatus = (value) => setLoading(value);
  const setDetails = (details) => setData(details);

  const changePage = (value) => setCurrentPage(value);

  const registerCourse = async (courseid, examdate) => {
    RegisterCourse(courseid, examdate, userID, dataUpdate, successStatus, failureStatus)
  };

  useEffect(() => {
    TotalCourses(userTitle, perPage, setTotalPages);
    CoursesDetails(loadingStatus, currentPage, perPage, setDetails);
  }, [currentPage, perPage, userTitle]);

  return (
    <>
      <div>
        <Alert variant="info" show={success}>
          <strong>Course registration successful!!!</strong>
        </Alert>
        <Alert variant="danger" show={failure}>
          <strong>
            Ooops!!! Seems you have enrolled for this course. Check out with the
            admin if not!
          </strong>
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
                  <th>Course Name</th>
                  <th>Description</th>
                  <th>Semester</th>
                  <th>Exam Date</th>
                  <th>Click To Register</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((course, i) => {
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
                        <td className="text-center">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              registerCourse(course._id, course.examdate)
                            }
                          >
                            <FontAwesomeIcon icon={faRegistered} />
                          </Button>
                        </td>
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
        {!loading && !data && (
          <p className="text-center">
            <strong>No information yet</strong>
          </p>
        )}
      </div>
    </>
  );
};
export default AllCourses;
