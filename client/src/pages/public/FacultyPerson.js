import { Image, Transformation } from "cloudinary-react";
import showRequest from "../../requests/show";
import { useParams } from "react-router-dom";
import PublicHeader from "../../components/Public-Header";
import Errors from "../../components/popups/Errors";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const FacultyPerson = () => {
    const [facultyPerson, setFacultyPerson] = useState("");
    const [errors, setErrors] = useState([]);

    const {id} = useParams();

//     const makeFakeData = () => {
    
//       setFacultyPerson({
//         name: `sally ${i}`,
//         office_location: `room ${i}`,
//         phone: `(${i}${i}${i})-${i}${i}${i}-${i}${i}${i}${i}`,
//         email: "sally@gmail.com",
//         courses_taught: ["english 1", "english 2", "english 3"],
//         extra:
//           "Eric Hehman is an Assistant Professor of Psychology at McGill University and director of the Seeing Human Lab.

// Generally, Dr. Hehman’s research examines how individuals perceive and evaluate one another across group boundaries (e.g., race, gender, sexual-orientation, occupation, etc). To address these questions, he takes a multi-method approach, incorporating a broad range of behavioral (e.g., computer-mouse tracking, digital face modeling, group interactions) and statistical techniques (e.g., multilevel modeling, structural equation modeling).

// He received his Ph.D. from the University of Delaware working with Sam Gaertner, and worked as a post-doctoral scholar with Jon Freeman at Dartmouth College and New York University. He was an Assistant Professor at Ryerson University prior to coming to McGill.",
//         photo: "url.com",
//       });
//     }

    useEffect(() => {
      showRequest("faculty", id, setFacultyPerson, setErrors);
    }, []);


    return (
      <>
        <PublicHeader />
        <main className="person">
          <Errors errors={errors} setErrors={setErrors} />
          {facultyPerson.photo ? (
            <Image cloudName="oliviafelix" publicId={facultyPerson.photo} />
          ) : (
            <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"></img>
          )}
          <h1>{facultyPerson.name}</h1>
          <div className="row person">
            <div className="col-12 col-md-6">
              <h3>Contact Information: </h3>
              <p>
                <b>Phone number:</b> {facultyPerson.phone}
              </p>
              <p>
                <b>Email:</b> {facultyPerson.email}
              </p>
              <p>
                <b>Office location:</b> {facultyPerson.office_location}
              </p>
            </div>
            <div className="col-12 col-md-6">
              <h3>Courses taught: </h3>
              {facultyPerson.courses_taught &&
                facultyPerson.courses_taught.map((course) => {
                  return (
                    <Link to={`/course/${course.id}`}>{course.title}</Link>
                  );
                })}
            </div>
          </div>
          <div className="row">
            <article>{facultyPerson.extra}</article>
          </div>
        </main>
      </>
    );


}

export default FacultyPerson;