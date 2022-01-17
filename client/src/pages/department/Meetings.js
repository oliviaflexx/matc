// import { useMediaQuery } from "react-responsive";
import Moment from "react-moment";
import ArticleIcon from "@mui/icons-material/Article";
import { useState, useEffect} from "react";
import {Button, Select, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CreateMeeting from "../../components/meeting/Create-Meeting";
import EditMeeting from "../../components/meeting/Edit-Meeting";
import DepartmentHeader from "../../components/Department-Header";
import getRequest from "../../requests/get";
import DeleteButtons from "../../components/DeleteButtons";
import Success from "../../components/popups/Success";
import Errors from "../../components/popups/Errors";

const Meetings = ({user}) => {
    // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const [meetings, setMeetings] = useState([]);
    const [errors, setErrors] = useState([]);
    const [edit, setEdit] = useState("");
    const [create, setCreate] = useState(false);
    const [deleteFirst, setDeleteFirst] = useState("");
    const [success, setSuccess] = useState(false);
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
      const setOGData = null;
      getRequest("meetings", setMeetings, setOGData, setErrors);
    }, []);
   

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
              setMeetings(meetings.reverse());
            }}
          >
            <MenuItem value={"newest"}>Newest</MenuItem>
            <MenuItem value={"oldest"}>Oldest</MenuItem>
          </Select>
        </div>

        {success && (
          <Success message={success.message} setSuccess={setSuccess} />
        )}
        <Errors errors={errors} setErrors={setErrors} />
        {create && (
          <CreateMeeting
            meetings={meetings}
            setMeetings={setMeetings}
            setCreate={setCreate}
            setSuccess={setSuccess}
          />
        )}
        <button onClick={makeFakeData}>Make fake data</button>
        {user && !create && (
          <Button
            variant="contained"
            onClick={() => {
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
                setSuccess={setSuccess}
              />
            );
          } else {
            return (
              <div
                className="file-container column"
                key={index}
                style={{ animation: `fadeIn 1s` }}
              >
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
                    <DeleteButtons
                      deleteFirst={deleteFirst}
                      setDeleteFirst={setDeleteFirst}
                      setCreate={setCreate}
                      resource={"meetings"}
                      resources={meetings}
                      deleteIndex={index}
                      setSuccess={setSuccess}
                      setErrors={setErrors}
                    />
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