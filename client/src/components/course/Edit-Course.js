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
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import editRequest from "../../requests/edit";
import Errors from "../popups/Errors";

const EditCourse = ({ course, courses, setCourses, edit, setEdit, setSuccess }) => {
  const [title, setTitle] = useState(course.title);
  const [number, setNumber] = useState(course.number);
  const [description, setDescription] = useState(course.description);
  const [prerequisites, setPrerequisites] = useState(course.prerequisites);
  console.log(course.prerequisites);
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
    <div
      className="file-container column"
      key={course.id}
      style={{ animation: `fadeIn 1s` }}
    >
      <Errors errors={errors} setErrors={setErrors} />
      <IconButton id="close" onClick={() => setEdit("")} aria-label="close">
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
          marginTop: "3rem",
          width: "-webkit-fill-available",
        }}
        label="Number"
        onChange={(e) => setNumber(e.target.value)}
        defaultValue={number}
      ></TextField>
      <TextField
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Description"
        onChange={(e) => setDescription(e.target.value)}
        defaultValue={description}
        multiline={true}
      ></TextField>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          margin: "1rem",
        }}
      >
        {prerequisites && prerequisites.map((course) => {
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
        sx={{ maxWidth: "150px", marginTop: "1rem" }}
        onClick={() => {
          editRequest(
            "courses",
            courses,
            setCourses,
            course.id,
            {
              title,
              number,
              description,
              prerequisites: prerequisites.map((course) => {
                return course.id;
              }),
            },
            [setTitle, setNumber, setDescription, setPrerequisites],
            [],
            edit,
            setEdit,
            setErrors,
            setSuccess
          );
        }}
      >
        Edit Course
      </Button>
    </div>
  );
};

export default EditCourse;
