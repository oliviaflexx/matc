import ArticleIcon from "@mui/icons-material/Article";
import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateSyllabus from "../../components/syllabus/Create-Syllabus";
import EditSyllabus from "../../components/syllabus/Edit-Syllabus";
import DepartmentHeader from "../../components/Department-Header";
import SearchIcon from "@mui/icons-material/Search";
import Success from "../../components/popups/Success";
import Errors from "../../components/popups/Errors";
import getRequest from "../../requests/get";
import DeleteButtons from "../../components/DeleteButtons";

const Syllabi = ({ user }) => {
  const [syllabi, setSyllabi] = useState([]);
  const [OGSyllabi, setOGSyllabi] = useState([]);

  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
  const [deleteFirst, setDeleteFirst] = useState("");
  const [success, setSuccess] = useState(false);

  const makeFakeData = () => {
    let syllabi1 = [];
    for (let i = 1; i < 11; i++) {
      syllabi1.push({
        title: `syllabus ${i}`,
        url: "https://www.google.com",
      });
    }
    setSyllabi(syllabi1);
    setOGSyllabi(syllabi1);
  };

  useEffect(() => {
    getRequest("syllabi", setSyllabi, setOGSyllabi, setErrors);
  }, []);

  const handleSearch = (search) => {
    const newSyllabi = OGSyllabi.filter((syllabus) =>
      // console.log(set.set.title);
      syllabus.title.toLowerCase().includes(search)
    );

    setSyllabi(newSyllabi);
  }

  return (
    <>
      <DepartmentHeader />
      <main>
        <div className="top-container">
          <h1>Syllabi</h1>
          <TextField
            // sx={{
            //   boxShadow: "2px 2px 6px 1px rgb(0 0 0 / 10%)"
            // }}
            size="small"
            label="Search syllabi"
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
          <CreateSyllabus
            syllabi={syllabi}
            setSyllabi={setSyllabi}
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
            Create New Syllabus
          </Button>
        )}
        {syllabi.map((syllabus, index) => {
          if (edit === index) {
            return (
              <EditSyllabus
                syllabus={syllabus}
                syllabi={syllabi}
                setSyllabi={setSyllabi}
                edit={edit}
                setEdit={setEdit}
                setSuccess={setSuccess}
              />
            );
          } else {
            return (
              <div
                className="file-container"
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
                      resource={"syllabi"}
                      resources={syllabi}
                      deleteIndex={index}
                      setSuccess={setSuccess}
                      setErrors={setErrors}
                    />
                  </>
                )}
                <h4>{syllabus.title}</h4>
                <Button
                  variant="outlined"
                  href={syllabus.url}
                  sx={{
                    "@media screen and (max-width: 600px)": {
                      marginTop: "1rem",
                    },
                  }}
                >
                  <ArticleIcon /> Document
                </Button>
              </div>
            );
          }
        })}
      </main>
    </>
  );
};

export default Syllabi;
