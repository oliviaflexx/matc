import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Button, TextField, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment-timezone";

const CreateAnnouncement = ({ announcements, setCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creator, setCreator] = useState("");
  const [date, setDate] = useState("");

  const [errors, setErrors] = useState([]);

  const makeCreateRequest = async () => {
    try {
      const res = await axiosInstance.post("/api/announcements/", {
        title: title,
        content: content,
        creator: creator,
        date: moment(date).tz("America"),
      });
      announcements.push(res.data);
      setContent("");
      setTitle("");
      setCreator("");
      setDate("");

      setCreate(false);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <div className="file-container column" style={{ animation: `fadeIn 1s` }}>
      <h2>New announcement</h2>
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
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      ></input>
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
        label="Creator"
        onChange={(e) => setCreator(e.target.value)}
        defaultValue={creator}
      ></TextField>

      <TextField
      multiline={true}
      minRows={4}
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Content"
        onChange={(e) => setContent(e.target.value)}
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
        Create Announcement
      </Button>
    </div>
  );
};

export default CreateAnnouncement;