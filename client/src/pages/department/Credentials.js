import ArticleIcon from "@mui/icons-material/Article";
import { useState, useEffect } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CreateCredential from "../../components/credential/Create-Credential";
import EditCredential from "../../components/credential/Edit-Credential";
import DepartmentHeader from "../../components/Department-Header";
import SearchIcon from "@mui/icons-material/Search";
import Success from "../../components/popups/Success";
import Errors from "../../components/popups/Errors";
import getRequest from "../../requests/get";
import DeleteButtons from "../../components/DeleteButtons";

const Credentials = ({user}) => {
  const [OGCredentials, setOGCredentials] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState("");
  const [create, setCreate] = useState(false);
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
      getRequest("credentials", setCredentials, setOGCredentials, setErrors);
    }, []);

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
            onChange={(e) => handleSearch(e.target.value)}
          ></TextField>
        </div>

        {success && (
          <Success message={success.message} setSuccess={setSuccess} />
        )}
        <Errors errors={errors} setErrors={setErrors} />
        <button onClick={makeFakeData}>Make fake data</button>
        {create && (
          <CreateCredential
            credentials={credentials}
            setCredentials={setCredentials}
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
                      aria-label="edit"
                    >
                      Edit
                    </Button>
                    <DeleteButtons
                      deleteFirst={deleteFirst}
                      setDeleteFirst={setDeleteFirst}
                      setCreate={setCreate}
                      resource={"credentials"}
                      resources={credentials}
                      deleteIndex={index}
                      setSuccess={setSuccess}
                      setErrors={setErrors}
                    />
                  </>
                )}

                <h4>{credential.title}</h4>
                <Button
                  variant="outlined"
                  href={credential.url}
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

export default Credentials;