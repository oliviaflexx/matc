import showRequest from "../../requests/show";
import { useParams } from "react-router-dom";
import PublicHeader from "../../components/Public-Header";
import Errors from "../../components/popups/Errors";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Course = () => {
    const [course, setCourse] = useState({});
    const [errors, setErrors] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      showRequest("courses", id, setCourse, setErrors);
    }, []);

    return (
      <>
        <PublicHeader />
        <main className="course">
          <Errors errors={errors} setErrors={setErrors} />
          <h1>{course.title}</h1>
          <div className="row">
            <div className="col-12">
              <article>{course.description}</article>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h5>Prerequisites: </h5>
              {course.prerequisites &&
                course.prerequisites.map((course) => {
                  return (
                    <Link to={`/course/${course.id}`}>{course.title}</Link>
                  );
                })}
            </div>
          </div>
        </main>
      </>
    );

}

export default Course;