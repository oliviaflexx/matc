import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CreateEvent from "../../components/event/Create-Event";
import EditEvent from "../../components/event/Edit-Event";
import Moment from "react-moment";
import PublicHeader from "../../components/Public-Header";
import getRequest from "../../requests/get";
import Success from "../../components/popups/Success";
import Errors from "../../components/popups/Errors";
import DeleteButtons from "../../components/DeleteButtons";

const Events = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
  const [deleteFirst, setDeleteFirst] = useState("");
  const [success, setSuccess] = useState(false);
  // user = {"hey": "lala"};

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
      const setOGData = null;
      getRequest("events", setEvents, setOGData, setErrors);
    }, []);


  return (
    <>
      <PublicHeader />
      <main>
        <h1>Events</h1>
        
        {success && (
          <Success message={success.message} setSuccess={setSuccess} />
        )}
        <Errors errors={errors} setErrors={setErrors} />
        <button onClick={makeFakeData}>Make fake data</button>
        {create && (
          <CreateEvent
            events={events}
            setEvents={setEvents}
            setCreate={setCreate}
            setSuccess={setSuccess}
          />
        )}
        {user && !create && (
          <Button
            variant="contained"
            onClick={() => {
  
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
                      resource={"events"}
                      resources={events}
                      deleteIndex={index}
                      setSuccess={setSuccess}
                      setErrors={setErrors}
                    />
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
      </main>
    </>
  );
};

export default Events;
