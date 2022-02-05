import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  TextField,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Errors from "../popups/Errors";
import { topTextfield, middleTextField, createButton } from "../../styles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import editRequest from "../../requests/edit";
import getRequest from "../../requests/get";

const EditFaculty = ({ facultyPerson, faculty, setFaculty, edit, setEdit, setSuccess }) => {
  const [name, setName] = useState(facultyPerson.name);
  const [office_location, setOffice_location] = useState(facultyPerson.office_location);
  const [phone, setPhone] = useState(facultyPerson.phone);
  const [email, setEmail] = useState(facultyPerson.email);
  const [courses_taught, setCourses_taught] = useState(facultyPerson.courses_taught);
  const [course, setCourse] = useState("");
  const [extra, setExtra] = useState(facultyPerson.extra);
  const [photo, setPhoto] = useState(facultyPerson.photo);
  const [errors, setErrors] = useState([]);
  const [photoChanged, setPhotoChanged] = useState(false);

  const [course_taught, setCourse_taught] = useState({});
  const [courses, setCourses] = useState([]);
  const [OGcourses, setOGcourses] = useState([]);

  const handleChange = (event) => {
    // check if course is already in list if yes then throw an error
    if (courses_taught.includes(event.target.value)) {
      setCourse_taught({});
    } else {
      setCourse_taught(event.target.value);
      courses_taught.push(event.target.value);
    }
  };

  useEffect(() => {
    getRequest("courses", setCourses, setOGcourses, setErrors);
  }, []);

  return (
    <div
      className="col-12 col-md-6 col-lg-4"
      style={{ animation: `fadeIn 1s` }}
    >
      <div className="faculty">
        <Errors errors={errors} setErrors={setErrors} />
        <IconButton id="close" onClick={() => setEdit("")}>
          <CloseIcon />
        </IconButton>
        <h3>Edit faculty</h3>
        {photoChanged && <p>{photo.name} uploaded</p>}
        <label htmlFor="contained-button-file">
          <input
            style={{
              display: "none",
            }}
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              setPhotoChanged(true);
            }}
          />

          <Button variant="contained" component="span">
            Change Photo
          </Button>
        </label>
        <TextField
          sx={topTextfield}
          label="Name"
          onChange={(e) => setName(e.target.value)}
          defaultValue={name}
        ></TextField>
        <TextField
          sx={middleTextField}
          label="Office Location"
          onChange={(e) => setOffice_location(e.target.value)}
          defaultValue={office_location}
        ></TextField>
        <TextField
          sx={middleTextField}
          label="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
          defaultValue={phone}
        ></TextField>
        <TextField
          sx={middleTextField}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={email}
        ></TextField>
        <TextField
          sx={middleTextField}
          multiline={true}
          minRows={4}
          label="Extra information"
          onChange={(e) => setExtra(e.target.value)}
          defaultValue={extra}
        ></TextField>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            margin: "1rem",
          }}
        >
          {courses_taught &&
            courses_taught.map((course) => {
              return (
                <Chip
                  label={course.title}
                  key={course.id}
                  onDelete={() => {
                    const newCourses = courses_taught.filter(
                      (course2) => course !== course2
                    );
                    setCourses_taught(newCourses);
                  }}
                />
              );
            })}
        </Stack>
        {courses.length && (
          <>
            <InputLabel id="demo-multiple-name-label">
              Courses taught
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={course_taught}
              onChange={handleChange}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        <Button
          variant="contained"
          size="medium"
          sx={createButton}
          onClick={() => {
            if (photoChanged) {
              const data = new FormData();
              data.append("file", photo);
              data.append("upload_preset", "the_preset");
              data.append("cloud_name", "oliviafelix");
              fetch(
                "https://api.cloudinary.com/v1_1/oliviafelix/image/upload",
                {
                  method: "post",
                  body: data,
                }
              )
                .then((resp) => resp.json())
                .then((data) => {
                  console.log(data.public_id);

                  editRequest(
                    "faculty",
                    faculty,
                    setFaculty,
                    facultyPerson.id,
                    {
                      name,
                      office_location,
                      phone,
                      email,
                      courses_taught: courses_taught.map((course) => {
                    return course.id;
                  }),
                      extra,
                      photo: data.public_id,
                    },
                    [
                      setName,
                      setOffice_location,
                      setPhone,
                      setEmail,
                      setExtra,
                      setPhoto,
                    ],
                    [setCourses_taught],
                    edit,
                    setEdit,
                    setErrors,
                    setSuccess
                  );
                })
                .catch((err) =>
                  setErrors([
                    {
                      message: "Image upload error",
                    },
                  ])
                );
            } else {
              editRequest(
                "faculty",
                faculty,
                setFaculty,
                facultyPerson.id,
                {
                  name,
                  office_location,
                  phone,
                  email,
                  courses_taught: courses_taught.map((course) => {
                    return course.id;
                  }),
                  extra,
                  photo,
                },
                [
                  setName,
                  setOffice_location,
                  setPhone,
                  setEmail,
                  setExtra,
                  setPhoto,
                ],
                [setCourses_taught],
                edit,
                setEdit,
                setErrors,
                setSuccess
              );
            }
          }}
        >
          Edit Faculty
        </Button>
      </div>
    </div>
  );
};

export default EditFaculty;