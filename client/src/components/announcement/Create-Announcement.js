import { useState } from "react";
import { Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment-timezone";
import Errors from "../popups/Errors";
import createRequest from "../../requests/create";

const CreateAnnouncement = ({ announcements, setCreate, setSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creator, setCreator] = useState("");
  const [date, setDate] = useState("");

  const [errors, setErrors] = useState([]);

  return (
    <div className="file-container column" style={{ animation: `fadeIn 1s` }}>
      <h2>New announcement</h2>
      <Errors errors={errors} setErrors={setErrors} />
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
        onClick={() =>
          createRequest(
            "announcements",
            announcements,
            {
              title,
              content,
              creator,
              date: moment(date).tz("America"),
            },
            [setTitle, setDate, setCreator, setContent],
            [],
            setCreate,
            setErrors,
            setSuccess
          )
        }
      >
        Create Announcement
      </Button>
    </div>
  );
};

export default CreateAnnouncement;