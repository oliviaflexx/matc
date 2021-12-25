import { useMediaQuery } from "react-responsive";
import Moment from "react-moment";
import ArticleIcon from "@mui/icons-material/Article";
import { axiosInstance } from "../../config";
import { useState, useEffect} from "react";
import { Alert, Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CreateMeeting from "../../components/Create-Meeting";
import EditMeeting from "../../components/Edit-Meeting";

const Meetings = ({user}) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const [meetings, setMeetings] = useState([]);
    const [errors, setErrors] = useState([]);
    const [edit, setEdit] = useState("");
    const [date, setDate] = useState("");
    const [agenda, setAgenda] = useState("");
    const [attendance, setAttendance] = useState("");
    const [minutes, setMinutes] = useState("");
    const [createMeeting, setCreateMeeting] = useState(false);

    console.log("RENDER");
    
    
    // const makeFakeData = () => {
    //   let meetings1 = [];
    //   for (let i = 1; i < 11; i++) {
    //     meetings1.push({
    //       date: Date.parse(`${i} Jan 2021 00:00:00 GMT`),
    //       attendance: "",
    //       minutes: "https://www.google.com",
    //       agenda: "https://www.google.com",
    //     });
    //     console.log("Made fake data");
    //   }
    //   setMeetings(meetings1);
      
    // }
    

    useEffect(  () => {
        const getMeetings = async () => {
            try {
              const res = await axiosInstance.get("/api/meetings");
              //   console.log(res.data);
              setMeetings(res.data);
            } catch (err) {
              setErrors(err.response.data.errors);
              console.log(err);
            }
        }
        
        getMeetings();
        // TESTING PURPOSES
        
    }, [])
   
  return (
    <main>
      <h1>Meetings</h1>
      
      {createMeeting && (
        <CreateMeeting
          meetings={meetings}
          setMeetings={setMeetings}
          setCreateMeeting={setCreateMeeting}
          
        />
      )}
      {/* <button onClick={makeFakeData}>Make fake data</button> */}
      {user && !createMeeting && (
        <Button
          variant="contained"
          onClick={() => {
            setAgenda("");
            setAttendance("");
            setMinutes("");
            setDate("");
            setEdit("");
            setCreateMeeting(true);
          }}
          sx={{ margin: "auto", marginBottom: "1rem", display: "flex" }}
        >
          Create New Meeting
        </Button>
      )}

      {meetings.map((meeting, index) => {
        if (edit === index) {
          return (
            <EditMeeting
              meeting={meeting}
              meetings={meetings}
              setMeetings={setMeetings}
              edit={edit}
              setEdit={setEdit}
              
            />
          );
        } else {
          return (
            <div className="file-container" key={index}>
              {user && (
                <Button
                  variant="text"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setEdit(index);
                    setCreateMeeting(false);
                  }}
                  size="small"
                  id="edit"
                >
                  Edit
                </Button>
              )}

              <div className="top">
                <Moment format="MMMM Do YYYY" withTitle>
                  {meeting.date}
                </Moment>
              </div>
              <div className="bottom">
                <Button
                  disabled={!meeting.minutes}
                  variant="outlined"
                  href={meeting.minutes}
                  sx={{
                    "@media screen and (max-width: 600px)": {
                      marginTop: "1rem",
                    },
                  }}
                >
                  <ArticleIcon /> Minutes
                </Button>
                <Button
                  disabled={!meeting.attendance}
                  variant="outlined"
                  href={meeting.attendance}
                  sx={{
                    "@media screen and (max-width: 600px)": {
                      marginTop: "1rem",
                    },
                  }}
                >
                  <ArticleIcon /> Attendance
                </Button>
                <Button
                  disabled={!meeting.agenda}
                  variant="outlined"
                  href={meeting.agenda}
                  sx={{
                    "@media screen and (max-width: 600px)": {
                      marginTop: "1rem",
                    },
                  }}
                >
                  <ArticleIcon /> Agenda
                </Button>
              </div>
            </div>
          );
        }
      })}
    </main>
  );
};

export default Meetings;