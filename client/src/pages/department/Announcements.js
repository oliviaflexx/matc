import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CreateAnnouncement from "../../components/announcement/Create-Announcement";
import EditAnnouncement from "../../components/announcement/Edit-Announcement";
import Moment from "react-moment";
import Success from "../../components/popups/Success";
import Errors from "../../components/popups/Errors";
import getRequest from "../../requests/get";
import DeleteButtons from "../../components/DeleteButtons";

const Announcements = ({user}) => {
    const [announcements, setAnnouncements] = useState([]);
    const [errors, setErrors] = useState([]);
    const [edit, setEdit] = useState("");
    const [create, setCreate] = useState(false);
    const [deleteFirst, setDeleteFirst] = useState("");
    const [success, setSuccess] = useState(false);
    // user = {"hey": "lala"};

    const makeFakeData = () => {
      let announcements1 = [];
      for (let i = 1; i < 11; i++) {
        announcements1.push({
          title: `announcement ${i}`,
          date: Date.parse(`${i} Jan 2021 00:00:00 GMT`),
          creator: "olivia",
          content: "Lorem ipsum dolor sit amet, et mea autem eligendi vulputate, sit ea fuisset fastidii. Cu est ullum accusamus assueverit, ex illum harum cum. Sed erat lucilius imperdiet in. Postea maiorum verterem duo et, ut usu homero libris apeirian. Et possim argumentum reprimique mea. Vis modus possit tamquam at, pro vero altera utroque an, cu quo diam veniam graeco. Mei noster delicata eu. Facete fuisset forensibus usu in, at nulla clita nam. Soluta melius ullamcorper usu at. Nec mentitum corrumpit ex, nonumes signiferumque sea no",

        });
      }
      setAnnouncements(announcements1);
    };



      useEffect(() => {
        const setOGData = null;
        getRequest("announcements", setAnnouncements, setOGData, setErrors);
      }, []);

      return (
        <section>
          <h1>Announcements</h1>
          {success && (
            <Success message={success.message} setSuccess={setSuccess} />
          )}
          <Errors errors={errors} setErrors={setErrors} />
          <button onClick={makeFakeData}>Make fake data</button>
          {create && (
            <CreateAnnouncement
              announcements={announcements}
              setAnnouncements={setAnnouncements}
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
              Create New Announcement
            </Button>
          )}
          {announcements.map((announcement, index) => {
            if (edit === index) {
              return (
                <EditAnnouncement
                  announcement={announcement}
                  announcements={announcements}
                  setAnnouncements={setAnnouncements}
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
                        resource={"announcements"}
                        resources={announcements}
                        deleteIndex={index}
                        setSuccess={setSuccess}
                        setErrors={setErrors}
                      />
                    </>
                  )}
                  <h3>{announcement.title}</h3>
                  <Moment format="MMMM Do YYYY" local withTitle>
                    {announcement.date}
                  </Moment>
                  <p>{announcement.content}</p>
                  <span>{announcement.creator}</span>
                </div>
              );
            }
          })}
        </section>
      );
}

export default Announcements;