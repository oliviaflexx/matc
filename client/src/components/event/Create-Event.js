import { useState } from "react";
import { Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import createRequest from "../../requests/create";
import Errors from "../popups/Errors";
import moment from "moment-timezone";

const CreateEvent = ({ events, setCreate, setSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [errors, setErrors] = useState([]);

  return (
    <div className="file-container column" style={{ animation: `fadeIn 1s` }}>
      <h2>New event</h2>
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
        multiline={true}
        minRows={4}
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Description"
        onChange={(e) => setDescription(e.target.value)}
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
            "events",
            events,
            {
              title,
              date: moment(date).tz("America"),
              description,
            },
            [setTitle, setDate, setDescription],
            [],
            setCreate,
            setErrors,
            setSuccess
          )
        }
      >
        Create Event
      </Button>
    </div>
  );
};

export default CreateEvent;
