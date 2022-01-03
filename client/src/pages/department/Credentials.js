import ArticleIcon from "@mui/icons-material/Article";
import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Alert, Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateCredential from "../../components/credential/Create-Credential";
import EditCredential from "../../components/credential/Edit-Credential";
import DepartmentHeader from "../../components/Department-Header";
import SearchIcon from "@mui/icons-material/Search";

const Credentials = ({user}) => {
  const [OGCredentials, setOGCredentials] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [deleteFirst, setDeleteFirst] = useState("");
  const [success, setSuccess] = useState(false);

   const makeFakeData = () => {
    let credentials1 = [];
    for (let i = 1; i < 11; i++) {
      credentials1.push({
        title: `credential ${i}`,
        url: "https://www.google.com",
      });
    }
    setCredentials(credentials1);
    setOGCredentials(credentials1);

  }

  useEffect(() => {
    const getCredentials = async () => {
      try {
        const res = await axiosInstance.get("/api/credentials");
        //   console.log(res.data);
        setOGCredentials(res.data);
        setCredentials(res.data);
      } catch (err) {
        setErrors(err.response.data.errors);
        console.log(err);
      }
    };

    getCredentials();
    // TESTING PURPOSES
  }, []);


  const deleteCredential = async (deleteIndex) => {
    try {
      const res = await axiosInstance.delete(
        `/api/credentials/${credentials[deleteIndex].id}`
      );

      const deleted = credentials.splice(deleteIndex, 1);
      setDeleteFirst("");
      setSuccess({ message: `${deleted[0].title} deleted` });
    } catch (err) {
      setErrors(err.response.data.errors);
      console.log(err);
    }
  };

  const handleSearch = (search) => {
    const newCredentials = OGCredentials.filter((credential) =>
      // console.log(set.set.title);
      credential.title.toLowerCase().includes(search)
    );

    setCredentials(newCredentials);
  }

  return (
    <>
      <DepartmentHeader />
      <main>
        <div className="top-container">
          <h1>Credentials</h1>
          <TextField
            // sx={{
            //   height: ".5rem"
            // }}
            size="small"
            label="Search credentials"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) =>
            handleSearch(e.target.value)}
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
          <CreateCredential
            credentials={credentials}
            setCredentials={setCredentials}
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
            Create New Credential
          </Button>
        )}
        {credentials.map((credential, index) => {
          if (edit === index) {
            return (
              <EditCredential
                credential={credential}
                credentials={credentials}
                setCredentials={setCredentials}
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
                      aria-label="edit"
                    >
                      Edit
                    </Button>
                    {deleteFirst === index ? (
                      <Button
                        variant="text"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          deleteCredential(index);
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

                <h4>{credential.title}</h4>
                <Button
                  variant="outlined"
                  href={credential.url}
                  // sx={{
                  //   "@media screen and (max-width: 600px)": {
                  //     marginTop: "1rem",
                  //   },
                  // }}
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

export default Credentials;