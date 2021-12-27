import { useMediaQuery } from "react-responsive";
import Moment from "react-moment";
import ArticleIcon from "@mui/icons-material/Article";
import { axiosInstance } from "../../config";
import { useState, useEffect} from "react";
import { Alert, Button, InputLabel, Select, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CreateMeeting from "../../components/Create-Meeting";
import EditMeeting from "../../components/Edit-Meeting";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import DepartmentHeader from "../../components/Department-Header";

const Meetings = ({user}) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const [meetings, setMeetings] = useState([]);
    const [errors, setErrors] = useState([]);
    const [edit, setEdit] = useState("");
    const [date, setDate] = useState("");
    const [agenda, setAgenda] = useState("");
    const [attendance, setAttendance] = useState("");
    const [minutes, setMinutes] = useState("");
    const [create, setCreate] = useState(false);
    const [deleteFirst, setDeleteFirst] = useState("");
    const [success, setSuccess] = useState(false);
  // const [search, setSearch] = useState("");
    console.log("RENDER");
    const [filter, setFilter] = useState("newest");
    
    
    const makeFakeData = () => {
      let meetings1 = [];
      for (let i = 1; i < 11; i++) {
        meetings1.push({
          date: Date.parse(`${i} Jan 2021 00:00:00 GMT`),
          attendance: "",
          minutes: "https://www.google.com",
          agenda: "https://www.google.com",
        });
        console.log("Made fake data");
      }
      setMeetings(meetings1);

      
    }
    

    useEffect(() => {
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
   
      const deleteMeeting = async (deleteIndex) => {
        try {
          const res = await axiosInstance.delete(
            `/api/meetings/${meetings[deleteIndex].id}`
          );

          const deleted = meetings.splice(deleteIndex, 1);
          setDeleteFirst("");
          setSuccess({
            message: `${moment(deleted[0].date).format(
              "MMMM Do YYYY"
            )} meeting deleted`,
          });
        } catch (err) {
          setErrors(err.response.data.errors);
          console.log(err);
        }
      };

      // useEffect(() => {
        
  
      //   const copyOGMeetings = OGMeetings;
      //   const foundMeeting = copyOGMeetings.find(
      //     (meeting) =>
      //       // console.log(set.set.title);
      //       (meeting.date = search)
      //   );

      //   if (foundMeeting) {
      //     console.log("DATE HERE", foundMeeting);
      //   }
        
      //   console.log(search);
      //   if (OGMeetings.length) {
      //     console.log("IF EXISTS", OGMeetings[0].date);
      //   } 

      //   if (foundMeeting) {
      //     setMeetings([foundMeeting]);
      //   } else {
      //     setMeetings([]);
      //   }
        
      // }, [search]);

  return (
    <>
      <DepartmentHeader />
      <main>
        <div className="top-container">
          <h1>Meetings</h1>
   

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Filter"
            onChange={(e) => {
              setFilter(e.target.value);
              setMeetings(meetings.reverse())
            }
            }
          >
            <MenuItem value={"newest"}>Newest</MenuItem>
            <MenuItem value={"oldest"}>Oldest</MenuItem>
  
          </Select>
        </div>

        {success && (
          <Alert
            sx={{
              marginBottom: "1rem",
            }}
            severity="success"
            onClose={() => setSuccess(false)}
          >
            {success.message}
          </Alert>
        )}
        {create && (
          <CreateMeeting
            meetings={meetings}
            setMeetings={setMeetings}
            setCreate={setCreate}
          />
        )}
        <button onClick={makeFakeData}>Make fake data</button>
        {user && !create && (
          <Button
            variant="contained"
            onClick={() => {
              setAgenda("");
              setAttendance("");
              setMinutes("");
              setDate("");
              setEdit("");
              setCreate(true);
            }}
            sx={{ margin: "auto", marginBottom: "1rem", display: "flex" }}
          >
            Create New Meeting
          </Button>
        )}

        {meetings.map((meeting, index) => {
          console.log(meeting.date);
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
              <div className="file-container column" key={index}>
                {user && (
                  <>
                    <Button
                      variant="text"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setEdit(index);
                        setCreate(false);
                      }}
                      size="small"
                      id="edit"
                    >
                      Edit
                    </Button>
                    {deleteFirst === index ? (
                      <Button
                        variant="text"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          deleteMeeting(index);
                        }}
                        size="small"
                        id="delete"
                        sx={{
                          color: "red",
                        }}
                        onBlur={() => setDeleteFirst("")}
                      >
                        Are you sure?
                      </Button>
                    ) : (
                      <Button
                        variant="text"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setDeleteFirst(index);
                          setCreate(false);
                        }}
                        size="small"
                        id="delete"
                        sx={{
                          color: "red",
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </>
                )}

                <div className="top">
                  <Moment format="MMMM Do YYYY" local withTitle>
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
    </>
  );
};

export default Meetings;