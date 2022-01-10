import { useState } from "react";
import { Alert, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Errors from "../popups/Errors";
import { topTextfield, middleTextField, createButton } from "../../styles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EditMeeting from "../meeting/Edit-Meeting";
import editRequest from "../../requests/edit";

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
          {courses_taught.map((course, index) => {
            return (
              <Chip
                label={course}
                key={index}
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
        <div className="courses">
          <TextField
            sx={{
              width: "50%",
            }}
            label="Course Taught"
            onChange={(e) => setCourse(e.target.value)}
            defaultValue={course}
          ></TextField>
          <Button
            onClick={() => {
              if (course) {
                setCourses_taught([...courses_taught, course]);
                setCourse("");
              }
            }}
          >
            Add Course
          </Button>
        </div>
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
                      courses_taught,
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
                  courses_taught,
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