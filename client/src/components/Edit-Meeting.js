import { axiosInstance } from "../config";
import { useState, useEffect } from "react";
import { Alert, Button, TextField, IconButton } from "@mui/material";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import validator from "validator";

const EditMeeting = ({
  meetings,
  setMeetings,
  setEdit,
  edit,
  meeting
}) => {
    const [date, setDate] = useState(moment(meeting.date).format("YYYY-MM-DD"));
    const [agenda, setAgenda] = useState(meeting.agenda);
    const [attendance, setAttendance] = useState(meeting.attendance);
    const [minutes, setMinutes] = useState(meeting.minutes);
    const [errors, setErrors] = useState([]);

    const makeEditRequest = async () => {
      try {
        
        const res = await axiosInstance.put(
          `/api/meetings/${meeting.id}`,
          {
            date: date,
            agenda: agenda,
            attendance: attendance,
            minutes: minutes,
          }
        );
      
        let oldMeetings = meetings;
        oldMeetings[edit] = res.data;
        setMeetings(oldMeetings);
        setAgenda("");
        setAttendance("");
        setDate("");
        setEdit("");
      } catch (err) {
        setErrors(err.response.data.errors);
        // console.log(err);
      }
    };

  return (
    <div className="file-container" key={meeting.id}>
      {errors.map((error) => {
        return (
          <Alert onClose={() => {setErrors([])}} severity="error">
            {error.message}
          </Alert>
        );
      })}
      <IconButton id="close" onClick={() => setEdit("")} aria-label="close">
        <CloseIcon />
      </IconButton>
      <label htmlFor="meeting date">Meeting date</label>
      <input
        id="meeting date"
        type="date"
        onChange={(e) => {
            setDate(e.target.value);
        }}
        value={date}
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
        defaultValue={attendance}
      ></TextField>
      <TextField
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Agenda URL"
        onChange={(e) => setAgenda(e.target.value)}
        defaultValue={agenda}
      ></TextField>
      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "150px", marginTop: "1rem" }}
        onClick={() => makeEditRequest()}
      >
        Edit Meeting
      </Button>
    </div>
  );
};

export default EditMeeting;