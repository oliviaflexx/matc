import DeleteIcon from "@mui/icons-material/Delete";
import deleteRequest from "../requests/delete";
import {Button } from "@mui/material";

const DeleteButtons = ({
  deleteFirst,
  setDeleteFirst,
  setCreate,
  resource,
  resources,
  deleteIndex,
  setSuccess,
  setErrors,
}) => {
  if (deleteFirst === deleteIndex) {
    return (
      <Button
        variant="text"
        startIcon={<DeleteIcon />}
        onClick={() => {
          deleteRequest(
            resource,
            resources,
            deleteIndex,
            setDeleteFirst,
            setSuccess,
            setErrors
          );
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
    );
  } else {
    return (
      <Button
        variant="text"
        startIcon={<DeleteIcon />}
        onClick={() => {
          setDeleteFirst(deleteIndex);
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
    );
  }
};

export default DeleteButtons;