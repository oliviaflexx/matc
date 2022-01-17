import { axiosInstance } from "../../config";
import getRequest from "../../requests/get";
import { useState, useEffect } from "react";
import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateEvent from "../../components/event/Create-Event";
import EditEvent from "../../components/event/Edit-Event";
import Success from "../../components/popups/Success";
import Errors from "../../components/popups/Errors";
import CreateFaculty from "../../components/faculty/Create-Faculty";
import { Image } from "cloudinary-react";
import DeleteButtons from "../../components/DeleteButtons";
import {Link} from "react-router-dom";
import EditFaculty from "../../components/faculty/Edit-Faculty";
import PublicHeader from "../../components/Public-Header";
import SearchIcon from "@mui/icons-material/Search";

const Faculty = ({ user }) => {
  const [faculty, setFaculty] = useState([]);
  const [OGfaculty, setOGfaculty] = useState([]);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
  const [deleteFirst, setDeleteFirst] = useState("");
  const [success, setSuccess] = useState(false);

  // user = { hey: "lala" };
  const makeFakeData = () => {
    let faculty1 = [];
    for (let i = 1; i < 10; i++) {
      faculty1.push({
        name: `sally ${i}`,
        office_location: `room ${i}`,
        phone: `(${i}${i}${i})-${i}${i}${i}-${i}${i}${i}${i}`,
        email: "sally@gmail.com",
        courses_taught: ["english 1", "english 2", "english 3"],
        extra:
          "Lorem ipsum dolor sit amet, et mea autem eligendi vulputate, sit ea fuisset fastidii. Cu est ullum accusamus assueverit, ex illum harum cum. Sed erat lucilius imperdiet in. Postea maiorum verterem duo et, ut usu homero libris apeirian. Et possim argumentum reprimique mea. Vis modus possit tamquam at, pro vero altera utroque an, cu quo diam veniam graeco. Mei noster delicata eu. Facete fuisset forensibus usu in, at nulla clita nam. Soluta melius ullamcorper usu at. Nec mentitum corrumpit ex, nonumes signiferumque sea no",
        photo: "url.com",
      });
    }
    setFaculty(faculty1);
    setOGfaculty(faculty1);
    console.log("data");
  };

  useEffect(() => {
    getRequest("faculty", setFaculty, setOGfaculty, setErrors);
  }, []);

  const handleSearch = (search) => {
    const newFaculty = OGfaculty.filter((facultyPerson) =>
      // console.log(set.set.title);
      facultyPerson.name.toLowerCase().includes(search)
    );

    setFaculty(newFaculty);
  };

  return (
    <>
      <PublicHeader />
      <main>
        <div className="top-container">
          <h1>Faculty</h1>
          <TextField
            // sx={{
            //   height: ".5rem"
            // }}
            size="small"
            label="Search faculty"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => handleSearch(e.target.value)}
          ></TextField>
        </div>

        {success && (
          <Success message={success.message} setSuccess={setSuccess} />
        )}
        <Errors errors={errors} setErrors={setErrors} />
        <button onClick={makeFakeData}>Make fake data</button>
        {create && (
          <CreateFaculty
            faculty={faculty}
            setFaculty={setFaculty}
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
            Add New Faculty Member
          </Button>
        )}
        <div className="row">
          {faculty.map((facultyPerson, index) => {
            if (edit === index) {
              return (
                <EditFaculty
                  facultyPerson={facultyPerson}
                  faculty={faculty}
                  setFaculty={setFaculty}
                  edit={edit}
                  setEdit={setEdit}
                  setSuccess={setSuccess}
                />
              );
            } else {
              return (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  style={{ animation: `fadeIn 1s` }}
                >
                  <div className="faculty">
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
                          aria-label="edit"
                        >
                          Edit
                        </Button>
                        <DeleteButtons
                          deleteFirst={deleteFirst}
                          setDeleteFirst={setDeleteFirst}
                          setCreate={setCreate}
                          resource={"faculty"}
                          resources={faculty}
                          deleteIndex={index}
                          setSuccess={setSuccess}
                          setErrors={setErrors}
                        />
                      </>
                    )}
                    <h3>{facultyPerson.name}</h3>
                    {facultyPerson.photo ? (
                      <Image
                        cloudName="oliviafelix"
                        publicId={facultyPerson.photo}
                      />
                    ) : (
                      <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"></img>
                    )}

                    <p>
                      <b>Phone number:</b> {facultyPerson.phone || "None"}
                    </p>
                    <p>
                      <b>Email:</b> {facultyPerson.email || "None"}
                    </p>
                    {facultyPerson.extra && (
                      <Link to={`/faculty/${facultyPerson.id}`}>See more</Link>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </main>
    </>
  );
};

export default Faculty;
