import { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Errors from "../popups/Errors";
import createRequest from "../../requests/create";

const CreateCourse = ({ courses, setCreate, setSuccess }) => {
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prerequisites, setPrerequisites] = useState([]);
  const [prerequisite, setPrerequisite] = useState({});

  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    // check if course is already in list if yes then throw an error
    if (prerequisites.includes(event.target.value)) {
      setPrerequisite({});
    } else {
      setPrerequisite(event.target.value);
      prerequisites.push(event.target.value);
      console.log(prerequisites);
    }
  };

  return (
    <div className="file-container column" style={{ animation: `fadeIn 1s` }}>
      <h2>New course</h2>
      <Errors errors={errors} setErrors={setErrors} />
      <IconButton id="close" onClick={() => setCreate(false)} c>
        <CloseIcon />
      </IconButton>

      <TextField
        sx={{
          marginTop: "3rem",
          width: "-webkit-fill-available",
        }}
        label="Title"
        onChange={(e) => setTitle(e.target.value)}
        defaultValue={title}
      ></TextField>
      <TextField
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Number"
        onChange={(e) => setNumber(e.target.value)}
      ></TextField>

      <TextField
        multiline={true}
        minRows={4}
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Description"
        onChange={(e) => setDescription(e.target.value)}
      ></TextField>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          margin: "1rem",
        }}
      >
        {prerequisites &&
          prerequisites.map((course) => {
            return (
              <Chip
                label={course.title}
                key={course.id}
                onDelete={() => {
                  const newCourses = prerequisites.filter(
                    (course2) => course !== course2
                  );
                  setPrerequisites(newCourses);
                }}
              />
            );
          })}
      </Stack>
      {courses.length && (
        <>
          <InputLabel id="demo-multiple-name-label">Prerequisites</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={prerequisite}
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
        sx={{
          maxWidth: "200px",
          marginTop: "1rem",
          backgroundColor: "#f89728",
        }}
        onClick={() =>
          createRequest(
            "courses",
            courses,
            {
              number,
              title,
              description,
              prerequisites: prerequisites.map((course) => {
                return course.id;
              }),
            },
            [setNumber, setTitle, setDescription, setPrerequisites],
            [],
            setCreate,
            setErrors,
            setSuccess
          )
        }
      >
        Create Course
      </Button>
    </div>
  );
};

export default CreateCourse;