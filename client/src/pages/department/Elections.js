import ArticleIcon from "@mui/icons-material/Article";
import { useState, useEffect } from "react";
import {Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CreateElection from "../../components/election/Create-Election";
import EditElection from "../../components/election/Edit-Election";
import DepartmentHeader from "../../components/Department-Header";
import SearchIcon from "@mui/icons-material/Search";
import Success from "../../components/popups/Success";
import Errors from "../../components/popups/Errors";
import getRequest from "../../requests/get";
import DeleteButtons from "../../components/DeleteButtons";

const Elections = ({user}) => {
  const [elections, setElections] = useState([]);
  const [OGElections, setOGElections] = useState([]);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
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
    getRequest("elections", setElections, setOGElections, setErrors);
  }, []);


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
          <Success message={success.message} setSuccess={setSuccess} />
        )}
        <Errors errors={errors} setErrors={setErrors} />
        <button onClick={makeFakeData}>Make fake data</button>
        {create && (
          <CreateElection
            elections={elections}
            setElections={setElections}
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
                      resource={"elections"}
                      resources={elections}
                      deleteIndex={index}
                      setSuccess={setSuccess}
                      setErrors={setErrors}
                    />
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