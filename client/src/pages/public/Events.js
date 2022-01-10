import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Alert, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateEvent from "../../components/event/Create-Event";
import EditEvent from "../../components/event/Edit-Event";
import Moment from "react-moment";
import PublicHeader from "../../components/Public-Header";

const Events = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
  const [deleteFirst, setDeleteFirst] = useState("");
  const [success, setSuccess] = useState(false);
  user = {"hey": "lala"};

  const makeFakeData = () => {
    let events1 = [];
    for (let i = 1; i < 11; i++) {
      events1.push({
        title: `event ${i}`,
        date: Date.parse(`${i} Jan 2021 00:00:00 GMT`),
        description:
          "Lorem ipsum dolor sit amet, et mea autem eligendi vulputate, sit ea fuisset fastidii. Cu est ullum accusamus assueverit, ex illum harum cum. Sed erat lucilius imperdiet in. Postea maiorum verterem duo et, ut usu homero libris apeirian. Et possim argumentum reprimique mea. Vis modus possit tamquam at, pro vero altera utroque an, cu quo diam veniam graeco. Mei noster delicata eu. Facete fuisset forensibus usu in, at nulla clita nam. Soluta melius ullamcorper usu at. Nec mentitum corrumpit ex, nonumes signiferumque sea no",
      });
    }
    setEvents(events1);
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axiosInstance.get("/api/events");
        //   console.log(res.data);
        setEvents(res.data);
      } catch (err) {
        setErrors(err.response.data.errors);
        console.log(err);
      }
    };

    getEvents();
  }, []);

  const deleteEvent = async (deleteIndex) => {
    try {
      const res = await axiosInstance.delete(
        `/api/events/${events[deleteIndex].id}`
      );

      const deleted = events.splice(deleteIndex, 1);
      setDeleteFirst("");
      setSuccess({ message: `${deleted[0].title} deleted` });
    } catch (err) {
      setErrors(err.response.data.errors);
      console.log(err);
    }
  };

  return (
    <>
    <PublicHeader/>
    <section>
      <h2>Events</h2>
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
      <button onClick={makeFakeData}>Make fake data</button>
      {create && (
        <CreateEvent
          events={events}
          setEvents={setEvents}
          setCreate={setCreate}
        />
      )}
      {user && !create && (
        <Button
          variant="contained"
          onClick={() => {
            // setUrl("");
            // setTitle("");
            setEdit("");
            setCreate(true);
          }}
          sx={{ margin: "auto", marginBottom: "1rem", display: "flex" }}
        >
          Create New Event
        </Button>
      )}
      {events.map((event, index) => {
        if (edit === index) {
          return (
            <EditEvent
              event={event}
              events={events}
              setEvents={setEvents}
              edit={edit}
              setEdit={setEdit}
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
                  {deleteFirst === index ? (
                    <Button
                      variant="text"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        deleteEvent(index);
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
              <h3>{event.title}</h3>
              <Moment format="MMMM Do YYYY" local withTitle>
                {event.date}
              </Moment>
              <p>{event.description}</p>
            </div>
          );
        }
      })}
    </section>
    </>
  );
};

export default Events;
