import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateAnnouncement from "../../components/announcement/Create-Announcement";
import EditAnnouncement from "../../components/announcement/Edit-Announcement";
import Moment from "react-moment";

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
        const getAnnouncements = async () => {
          try {
            const res = await axiosInstance.get("/api/announcements");
            //   console.log(res.data);
            setAnnouncements(res.data);
          } catch (err) {
            setErrors(err.response.data.errors);
            console.log(err);
          }
        };

        getAnnouncements();
      }, []);

      const deleteAnnouncement = async (deleteIndex) => {
        try {
          const res = await axiosInstance.delete(
            `/api/announcements/${announcements[deleteIndex].id}`
          );

          const deleted = announcements.splice(deleteIndex, 1);
          setDeleteFirst("");
          setSuccess({ message: `${deleted[0].title} deleted` });
        } catch (err) {
          setErrors(err.response.data.errors);
          console.log(err);
        }
      };

      return (
        <section>
          <h2>Announcements</h2>
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
            <CreateAnnouncement
              announcements={announcements}
              setAnnouncements={setAnnouncements}
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
                            deleteAnnouncement(index);
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