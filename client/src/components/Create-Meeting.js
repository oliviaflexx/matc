import { axiosInstance } from "../config";
import { useState, useEffect } from "react";
import { Button, TextField, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment-timezone";

const CreateMeeting = ({ meetings, setCreate, setMeetings }) => {
  const [date, setDate] = useState("");
  const [agenda, setAgenda] = useState("");
  const [attendance, setAttendance] = useState("");
  const [minutes, setMinutes] = useState("");
  const [errors, setErrors] = useState([]);

  const makeCreateRequest = async () => {
    try {
      const resEdit = await axiosInstance.post("/api/meetings/", {
        date: moment(date).tz('America'),
        agenda: agenda,
        attendance: attendance,
        minutes: minutes,
      });
      
        const resGet = await axiosInstance.get("/api/meetings");
        //   console.log(res.data);
        setMeetings(resGet.data);

      setAgenda("");
      setAttendance("");
      setDate("");
      setCreate(false);
    } catch (err) {
      setErrors(err.response.data.errors);
     
    }
  };
  return (
    <div className="file-container column">
      <h2>New meeting</h2>
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
        onClick={() => makeCreateRequest()}
      >
        Create Meeting
      </Button>
    </div>
  );
};

export default CreateMeeting;
