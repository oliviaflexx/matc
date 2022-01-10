import { useState } from "react";
import {Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import editRequest from "../../requests/edit";
import Errors from "../popups/Errors";

const EditEvent = ({ event, events, setEvents, edit, setEdit, setSuccess }) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [description, setDescription] = useState(event.description);

  const [errors, setErrors] = useState([]);

  return (
    <div
      className="file-container column"
      key={event.id}
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
        id="input-text"
        label="Description"
        onChange={(e) => setDescription(e.target.value)}
        defaultValue={description}
        multiline={true}
      ></TextField>

      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "150px", marginTop: "1rem" }}
        onClick={() =>
          editRequest(
            "events",
            events,
            setEvents,
            event.id,
            {
              title,
              date,
              description,
            },
            [setTitle, setDate, setDescription],
            [],
            edit,
            setEdit,
            setErrors,
            setSuccess
          )
        }
      >
        Edit Event
      </Button>
    </div>
  );
};

export default EditEvent;
