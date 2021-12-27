import { axiosInstance } from "../config";
import { useState } from "react";
import {
  Alert,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditSyllabus = ({ syllabus, syllabi, setSyllabi, edit, setEdit }) => {
  const [url, setUrl] = useState(syllabus.url);
  const [title, setTitle] = useState(syllabus.title);
  const [errors, setErrors] = useState([]);

  const makeEditRequest = async () => {
    try {
      const res = await axiosInstance.put(`/api/syllabi/${syllabi.id}`, {
        url: url,
        title: title,
      });

      let oldSyllabi = syllabi;
      oldSyllabi[edit] = res.data;
      setSyllabi(oldSyllabi);
      setUrl("");
      setTitle("");
      setEdit("");
    } catch (err) {
      setErrors(err.response.data.errors);
      // console.log(err);
    }
  };

  return (
    <div className="file-container column" key={syllabus.id}>
      {errors.map((error) => {
        return (
          <Alert
            onClose={() => {
              setErrors([]);
            }}
            severity="error"
          >
            {error.message}
          </Alert>
        );
      })}
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
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Syllabus Document URL"
        onChange={(e) => setUrl(e.target.value)}
        defaultValue={url}
      ></TextField>
      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "150px", marginTop: "1rem" }}
        onClick={() => makeEditRequest()}
      >
        Edit Syllabus
      </Button>
    </div>
  );
};

export default EditSyllabus;
