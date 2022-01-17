import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Button, TextField, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment-timezone";
import Errors from "../popups/Errors";
import createRequest from "../../requests/create";

const CreateMeeting = ({ meetings, setCreate, setMeetings, setSuccess }) => {
  const [date, setDate] = useState("");
  const [agenda, setAgenda] = useState("");
  const [attendance, setAttendance] = useState("");
  const [minutes, setMinutes] = useState("");
  const [errors, setErrors] = useState([]);

  return (
    <div className="file-container column" style={{ animation: `fadeIn 1s` }}>
      <h2>New meeting</h2>
      <Errors errors={errors} setErrors={setErrors} />
      <IconButton
        id="close"
        onClick={() => setCreate(false)}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      <label htmlFor="meeting date">Meeting date</label>
      <input
        id="meeting date"
        type="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      ></input>
      <TextField
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        label="Minutes URL"
        onChange={(e) => setMinutes(e.target.value)}
        defaultValue={minutes}
      ></TextField>
      <TextField
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Attendance URL"
        onChange={(e) => setAttendance(e.target.value)}
      ></TextField>
      <TextField
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Agenda URL"
        onChange={(e) => setAgenda(e.target.value)}
      ></TextField>
      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "200px", marginTop: "1rem" }}
        onClick={() =>
          createRequest(
            "meetings",
            meetings,
            {
              date: moment(date).tz("America"),
              agenda,
              attendance,
              minutes
            },
            [setDate, setAgenda, setAttendance, setMinutes],
            [],
            setCreate,
            setErrors,
            setSuccess
          )
        }
      >
        Create Meeting
      </Button>
    </div>
  );
};

export default CreateMeeting;
