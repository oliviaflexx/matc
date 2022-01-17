import { axiosInstance } from "../../config";
import { useState } from "react";
import { Alert, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Errors from "../popups/Errors";
import editRequest from "../../requests/edit";

const EditElection = ({
  election,
  elections,
  setElections,
  edit,
  setEdit,
  setSuccess,
}) => {
  const [url, setUrl] = useState(election.url);
  const [title, setTitle] = useState(election.title);
  const [errors, setErrors] = useState([]);

  return (
    <div
      className="file-container column"
      key={election.id}
      style={{ animation: `fadeIn 1s` }}
    >
      <Errors errors={errors} setErrors={setErrors} />
      <IconButton id="close" onClick={() => setEdit("")} aria-label="close">
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
        label="Election Document URL"
        onChange={(e) => setUrl(e.target.value)}
        defaultValue={url}
      ></TextField>
      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "150px", marginTop: "1rem" }}
        onClick={() =>
          editRequest(
            "elections",
            elections,
            setElections,
            election.id,
            {
              url,
              title,
            },
            [setTitle, setUrl],
            [],
            edit,
            setEdit,
            setErrors,
            setSuccess
          )
        }
      >
        Edit Election
      </Button>
    </div>
  );
};

export default EditElection;
