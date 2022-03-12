import getRequest from "../../requests/get";
import { useState, useEffect } from "react";
import {Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Success from "../../components/popups/Success";
import Errors from "../../components/popups/Errors";
import CreateCourse from "../../components/course/Create-Course";
import DeleteButtons from "../../components/DeleteButtons";
import { Link } from "react-router-dom";
import EditCourse from "../../components/course/Edit-Course";
import PublicHeader from "../../components/Public-Header";
import SearchIcon from "@mui/icons-material/Search";

const Courses = ({user}) => {
    const [courses, setCourses] = useState([]);
    const [OGcourses, setOGcourses] = useState([]);
    const [errors, setErrors] = useState([]);
    const [edit, setEdit] = useState("");
    const [create, setCreate] = useState(false);
    const [deleteFirst, setDeleteFirst] = useState("");
    const [success, setSuccess] = useState(false);

    // user = {id: 1}
    const makeFakeData = () => {
      let courses1 = [];
      for (let i = 1; i < 100; i++) {
        courses1.push({
          title: `course ${i}`,
          description:
            "Lorem ipsum dolor sit amet, et mea autem eligendi vulputate, sit ea fuisset fastidii. Cu est ullum accusamus assueverit, ex illum harum cum. Sed erat lucilius imperdiet in. Postea maiorum verterem duo et, ut usu homero libris apeirian. Et possim argumentum reprimique mea. Vis modus possit tamquam at, pro vero altera utroque an, cu quo diam veniam graeco. Mei noster delicata eu. Facete fuisset forensibus usu in, at nulla clita nam. Soluta melius ullamcorper usu at. Nec mentitum corrumpit ex, nonumes signiferumque sea no",
          number: i,
          prerequisites: []
        });
      }
      setCourses(courses1);
      setOGcourses(courses1);
      console.log(courses);
    };

    useEffect(() => {
      getRequest("courses", setCourses, setOGcourses, setErrors);
    }, []);

    const handleSearch = (search) => {
      const newCourses = OGcourses.filter((course) =>
        course.title.toLowerCase().includes(search)
      );

      setCourses(newCourses);
    };

    return (
      <>
        <PublicHeader />
        <main>
          <div className="top-container">
            <h1>Courses</h1>
            <TextField
              size="small"
              label="Search courses"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handleSearch(e.target.value)}
            ></TextField>
          </div>

          {success && (
            <Success message={success.message} setSuccess={setSuccess} />
          )}
          <Errors errors={errors} setErrors={setErrors} />
          <button onClick={makeFakeData}>Make fake data</button>
          {create && (
            <CreateCourse
              courses={courses}
              setCourses={setCourses}
              setCreate={setCreate}
              setSuccess={setSuccess}
            />
          )}
          {user && !create && (
            <Button
              variant="contained"
              onClick={() => {
                setEdit("");
                setCreate(true);
              }}
              sx={{ margin: "auto", marginBottom: "1rem", display: "flex" }}
            >
              Add New Course
            </Button>
          )}
          <div className="row">
            {courses.map((course, index) => {
              if (edit === index) {
                return (
                  <EditCourse
                    key={course.id}
                    course={course}
                    courses={courses}
                    setCourses={setCourses}
                    edit={edit}
                    setEdit={setEdit}
                    setSuccess={setSuccess}
                  />
                );
              } else {
                return (
                  <div
                    className="col-12 col-md-6 col-lg-4"
                    style={{ animation: `fadeIn 1s` }}
                    key={course.id}
                  >
                    <div className="faculty">
                      {user && (
                        <>
                          <Button
                            variant="text"
                            startIcon={<EditIcon />}
                            onClick={() => {
                              setEdit(index);
                              setCreate(false);
                            }}
                            size="small"
                            id="edit"
                            aria-label="edit"
                          >
                            Edit
                          </Button>
                          <DeleteButtons
                            deleteFirst={deleteFirst}
                            setDeleteFirst={setDeleteFirst}
                            setCreate={setCreate}
                            resource={"courses"}
                            resources={courses}
                            deleteIndex={index}
                            setSuccess={setSuccess}
                            setErrors={setErrors}
                          />
                        </>
                      )}
                      <Link to={`/course/${course.id}`}>
                        <h3>{course.title}</h3>
                      </Link>
                      <p>
                        <b>Course number:</b> {course.number}
                      </p>
                      <p>{course.description}</p>
                      <p>
                        <b>Prerequisites: </b>
                        {course.prerequisites &&
                          course.prerequisites.map((prereq) => {
                            return (
                              <Link style={{
                                marginRight: ".5rem"
                              }} to={`/course/${prereq.id}`}>
                                {prereq.title},
                              </Link>
                            );
                          })}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </main>
      </>
    );
};

export default Courses;