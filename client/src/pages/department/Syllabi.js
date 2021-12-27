import ArticleIcon from "@mui/icons-material/Article";
import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateSyllabus from "../../components/Create-Syllabus";
import EditSyllabus from "../../components/Edit-Syllabus";
import DepartmentHeader from "../../components/Department-Header";
import SearchIcon from "@mui/icons-material/Search";

const Syllabi = ({ user }) => {
  const [syllabi, setSyllabi] = useState([]);
  const [OGSyllabi, setOGSyllabi] = useState([]);

  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
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
    const getSyllabi = async () => {
      try {
        const res = await axiosInstance.get("/api/syllabi");
        //   console.log(res.data);
        setSyllabi(res.data);
      } catch (err) {
        setErrors(err.response.data.errors);
        console.log(err);
      }
    };

    getSyllabi();

  }, []);

  const deleteSyllabus = async (deleteIndex) => {
    try {
      const res = await axiosInstance.delete(
        `/api/syllabi/${syllabi[deleteIndex].id}`
      );

      const deleted = syllabi.splice(deleteIndex, 1);
      setDeleteFirst("");
      setSuccess({ message: `${deleted[0].title} deleted` });
    } catch (err) {
      setErrors(err.response.data.errors);
      console.log(err);
    }
  };

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
            //   height: ".5rem"
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
        <button onClick={makeFakeData}>Make fake data</button>
        {create && (
          <CreateSyllabus
            syllabi={syllabi}
            setSyllabi={setSyllabi}
            setCreate={setCreate}
          />
        )}
        {user && !create && (
          <Button
            variant="contained"
            onClick={() => {
              setUrl("");
              setTitle("");
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
              />
            );
          } else {
            return (
              <div className="file-container" key={index}>
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
                          deleteSyllabus(index);
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
                  <ArticleIcon /> URL
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
