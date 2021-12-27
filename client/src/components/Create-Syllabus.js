import { axiosInstance } from "../config";
import { useState, useEffect } from "react";
import { Button, TextField, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CreateSyllabus = ({ syllabi, setCreate }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const makeCreateRequest = async () => {
    try {
      const res = await axiosInstance.post("/api/syllabi/", {
        url: url,
        title: title,
      });
      syllabi.push(res.data);
      setUrl("");
      setTitle("");
      setCreate(false);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <div className="file-container column">
      <h2>New syllabus</h2>
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
      <IconButton
        id="close"
        onClick={() => setCreate(false)}
        aria-label="close"
      >
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
      ></TextField>

      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "200px", marginTop: "1rem" }}
        onClick={() => makeCreateRequest()}
      >
        Create Syllabus
      </Button>
    </div>
  );
};

export default CreateSyllabus;
