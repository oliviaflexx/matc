import { useState } from "react";
import { Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Errors from "../popups/Errors";
import createRequest from "../../requests/create";

const CreateSyllabus = ({ syllabi, setCreate, setSuccess }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  return (
    <div className="file-container column" style={{ animation: `fadeIn 1s` }}>
      <h2>New syllabus</h2>
      <Errors errors={errors} setErrors={setErrors} />
      <IconButton
        id="close"
        onClick={() => setCreate(false)}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <TextField
        sx={{
          marginTop: "3rem",
          width: "-webkit-fill-available",
        }}
        label="Title"
        onChange={(e) => setTitle(e.target.value)}
        defaultValue={title}
      ></TextField>
      <TextField
        sx={{
          marginTop: "1rem",
          width: "-webkit-fill-available",
        }}
        id="input-text"
        label="Syllabus Document URL"
        onChange={(e) => setUrl(e.target.value)}
      ></TextField>

      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "200px", marginTop: "1rem" }}
        onClick={() =>
          createRequest(
            "syllabi",
            syllabi,
            {
              url,
              title,
            },
            [setUrl, setTitle],
            [],
            setCreate,
            setErrors,
            setSuccess
          )
        }
      >
        Create Syllabus
      </Button>
    </div>
  );
};

export default CreateSyllabus;
