import ArticleIcon from "@mui/icons-material/Article";
import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateElection from "../../components/election/Create-Election";
import EditElection from "../../components/election/Edit-Election";
import DepartmentHeader from "../../components/Department-Header";
import SearchIcon from "@mui/icons-material/Search";

const Elections = ({user}) => {
  const [elections, setElections] = useState([]);
  const [OGElections, setOGElections] = useState([]);

  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
  // const [url, setUrl] = useState("");
  // const [title, setTitle] = useState("");
  const [deleteFirst, setDeleteFirst] = useState("");
  const [success, setSuccess] = useState(false);

  const makeFakeData = () => {
    let elections1 = [];
    for (let i = 1; i < 11; i++) {
      elections1.push({
        title: `election ${i}`,
        url: "https://www.google.com",
      });
    }
    setElections(elections1);
    setOGElections(elections1);
  }


  useEffect(() => {
    const getElections = async () => {
      try {
        const res = await axiosInstance.get("/api/elections");
        //   console.log(res.data);
        setElections(res.data);
        setOGElections(res.data);
      } catch (err) {
        setErrors(err.response.data.errors);
        console.log(err);
      }
    };

    getElections();
  }, []);

  const deleteElection = async (deleteIndex) => {
    try {
      const res = await axiosInstance.delete(
        `/api/elections/${elections[deleteIndex].id}`
      );

      const deleted = elections.splice(deleteIndex, 1);
      setDeleteFirst("");
      setSuccess({ message: `${deleted[0].title} deleted` });
    } catch (err) {
      setErrors(err.response.data.errors);
      console.log(err);
    }
  };

  const handleSearch = (search) => {
    const newElections = OGElections.filter((election) =>
    // console.log(set.set.title);
    election.title.toLowerCase().includes(search)
  );

  setElections(newElections);
  }
  

  return (
    <>
      <DepartmentHeader />
      <main>
        <div className="top-container">
          <h1>Elections</h1>
          <TextField
            // sx={{
            //   height: ".5rem"
            // }}
            size="small"
            label="Search elections"
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
          <CreateElection
            elections={elections}
            setElections={setElections}
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
            Create New Election
          </Button>
        )}
        {elections.map((election, index) => {
          if (edit === index) {
            return (
              <EditElection
                election={election}
                elections={elections}
                setElections={setElections}
                edit={edit}
                setEdit={setEdit}
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
                    {deleteFirst === index ? (
                      <Button
                        variant="text"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          deleteElection(index);
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
                <h4>{election.title}</h4>
                <Button
                  variant="outlined"
                  href={election.url}
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
}

export default Elections;