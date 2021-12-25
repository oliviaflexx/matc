import { useMediaQuery } from "react-responsive";
import Moment from "react-moment";
import ArticleIcon from "@mui/icons-material/Article";
import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Alert, Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CreateElection from "../../components/Create-Election";
import EditElection from "../../components/Edit-Election";

const Elections = ({user}) => {
  const [elections, setElections] = useState([]);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

//   const makeFakeData = () => {
//     let elections1 = [];
//     for (let i = 1; i < 11; i++) {
//       elections1.push({
//         title: `election ${i}`,
//         url: "https://www.google.com",
//       });
//     }
//     setElections(elections1);

//   }

  useEffect(() => {
    const getElections = async () => {
      try {
        const res = await axiosInstance.get("/api/elections");
        //   console.log(res.data);
        setElections(res.data);
      } catch (err) {
        setErrors(err.response.data.errors);
        console.log(err);
      }
    };

    getElections();
    // TESTING PURPOSES
  }, []);

  return (
    <main>
      <h1>Elections</h1>
      {/* <button onClick={makeFakeData}>Make fake data</button> */}
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
            setUrl("");
            setTitle("");
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
            <div className="file-container" key={index}>
              {user && (
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
                <ArticleIcon /> URL
              </Button>
            </div>
          );
        }
      })}
    </main>
  );
}

export default Elections;