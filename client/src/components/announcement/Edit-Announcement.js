import { useState } from "react";
import {Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment-timezone";
import Errors from "../popups/Errors";
import editRequest from "../../requests/edit";

const EditAnnouncement = ({
  announcement,
  announcements,
  setAnnouncements,
  edit,
  setEdit,
  setSuccess,
}) => {
  const [title, setTitle] = useState(announcement.title);
  const [date, setDate] = useState(announcement.date);
  const [creator, setCreator] = useState(announcement.creator);
  const [content, setContent] = useState(announcement.content);

  const [errors, setErrors] = useState([]);


  return (
    <div
      className="file-container column"
      key={announcement.id}
      style={{ animation: `fadeIn 1s` }}
    >
      <Errors errors={errors} setErrors={setErrors} />
      <IconButton id="close" onClick={() => setEdit("")} aria-label="close">
        <CloseIcon />
      </IconButton>
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
        value={date}
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
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Content"
        onChange={(e) => setContent(e.target.value)}
        defaultValue={content}
        multiline={true}
      ></TextField>

      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "150px", marginTop: "1rem" }}
        onClick={() =>
          editRequest(
            "announcements",
            announcements,
            setAnnouncements,
            announcement.id,
            {
              title,
              content,
              creator,
              date: moment(date).tz('America'),
            },
            [setTitle, setDate, setCreator, setContent],
            [],
            edit,
            setEdit,
            setErrors,
            setSuccess
          )
        }
      >
        Edit Announcement
      </Button>
    </div>
  );
};

export default EditAnnouncement;
