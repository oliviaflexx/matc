import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Button, TextField, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CreateCredential = ({ credentials, setCreate }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const makeCreateRequest = async () => {
    try {
      const res = await axiosInstance.post("/api/credentials/", {
        url: url,
        title: title,
      });
      credentials.push(res.data);
      setUrl("");
      setTitle("");
      setCreate(false);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <div className="file-container column" style={{ animation: `fadeIn 1s` }}>
      <h2>New credential</h2>
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
        label="Credential Document URL"
        onChange={(e) => setUrl(e.target.value)}
      ></TextField>

      <Button
        variant="contained"
        size="medium"
        sx={{
          maxWidth: "200px",
          marginTop: "1rem",
          backgroundColor: "#f89728",
        }}
        onClick={() => makeCreateRequest()}
      >
        Create Credential
      </Button>
    </div>
  );
};

export default CreateCredential;