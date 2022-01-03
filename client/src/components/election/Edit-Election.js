import { axiosInstance } from "../../config";
import { useState } from "react";
import { Alert, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditElection = ({ election, elections, setElections, edit, setEdit }) => {
  const [url, setUrl] = useState(election.url);
  const [title, setTitle] = useState(election.title);
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
    <div
      className="file-container column"
      key={election.id}
      style={{ animation: `fadeIn 1s` }}
    >
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