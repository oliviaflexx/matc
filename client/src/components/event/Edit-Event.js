import { axiosInstance } from "../../config";
import { useState } from "react";
import { Alert, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment-timezone";

const EditEvent = ({
  event,
  events,
  setEvents,
  edit,
  setEdit,
}) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [description, setDescription] = useState(event.description);

  const [errors, setErrors] = useState([]);

  const makeEditRequest = async () => {
    try {
      const res = await axiosInstance.put(
        `/api/events/${event.id}`,
        {
          title: title,
          date: moment(date).tz("America"),
          description: description
        }
      );

      let oldEvents = events;
      oldEvents[edit] = res.data;
      setEvents(oldEvents);
      setDescription("");
      setTitle("");
      setDate("");

      setEdit("");
    } catch (err) {
      setErrors(err.response.data.errors);
      // console.log(err);
    }
  };

  return (
    <div
      className="file-container column"
      key={event.id}
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
        onClick={() => makeEditRequest()}
      >
        Edit Event
      </Button>
    </div>
  );
};

export default EditEvent;
