import { axiosInstance } from "../config";
import { useState, useEffect } from "react";
import { Alert, Button, TextField, IconButton, AlertTitle } from "@mui/material";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import validator from "validator";

const EditElection = ({ election, elections, setElections, edit, setEdit }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const makeEditRequest = async () => {
    try {
      const res = await axiosInstance.put(`/api/elections/${election.id}`, {
        url: url,
        title: title
      });

      let oldElections = elections;
      oldElections[edit] = res.data;
      setElections(oldElections);
      setUrl("");
      setTitle("");
      setEdit("");
    } catch (err) {
      setErrors(err.response.data.errors);
      // console.log(err);
    }
  };

  return (
    <div className="file-container" key={election.id}>
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
        label="Election Document URL"
        onChange={(e) => setUrl(e.target.value)}
        defaultValue={url}
       
      ></TextField>
      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "150px", marginTop: "1rem" }}
        onClick={() => makeEditRequest()}
      >
        Edit Election
      </Button>
    </div>
  );
};

export default EditElection;
