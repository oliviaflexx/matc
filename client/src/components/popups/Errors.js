import { Alert } from "@mui/material";

const Errors = ({errors, setErrors}) => {

  if (errors) {
return (
    errors.map((error) => {
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
    })
  )
  } else {
    return null;
  }
  
    
}

export default Errors;