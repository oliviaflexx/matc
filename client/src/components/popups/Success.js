import { Alert } from "@mui/material";

const Success = ({message, setSuccess}) => {
    return (
      <Alert
        sx={{
          marginBottom: "1rem",
        }}
        severity="success"
        onClose={() => setSuccess(false)}
      >
        {message}
      </Alert>
    );
}

export default Success;