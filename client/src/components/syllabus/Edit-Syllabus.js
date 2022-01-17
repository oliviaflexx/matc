import { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Errors from "../popups/Errors";
import editRequest from "../../requests/edit";

const EditSyllabus = ({
  syllabus,
  syllabi,
  setSyllabi,
  edit,
  setEdit,
  setSuccess,
}) => {
  const [url, setUrl] = useState(syllabus.url);
  const [title, setTitle] = useState(syllabus.title);
  const [errors, setErrors] = useState([]);

  return (
    <div
      className="file-container column"
      key={syllabus.id}
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
        label="Syllabus Document URL"
        onChange={(e) => setUrl(e.target.value)}
        defaultValue={url}
      ></TextField>
      <Button
        variant="contained"
        size="medium"
        sx={{ maxWidth: "150px", marginTop: "1rem" }}
        onClick={() =>
          editRequest(
            "syllabi",
            syllabi,
            setSyllabi,
            syllabus.id,
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
        Edit Syllabus
      </Button>
    </div>
  );
};

export default EditSyllabus;
