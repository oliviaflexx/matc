import { axiosInstance } from "../../config";
import { useState } from "react";
import { Alert, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signout = ({user, setUser}) => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);

    const makeSignoutRequest = async () => {
      try {
        const res = await axiosInstance.post("/api/auth/signout");

        setSuccess(true);
        setUser(null);
        const timerId = setTimeout(() => {
          navigate("/department");
        }, 1500);
      } catch (err) {
        setErrors(err.response.data.errors);
      }
    };

    return (
      <main>
        {errors.map((error) => {
          return (
            <Alert
              onClose={() => {
                setErrors([]);
              }}
              sx={{
                marginBottom: "1rem",
              }}
              severity="error"
            >
              {error.message}
            </Alert>
          );
        })}
        {success && (
          <Alert
            sx={{
              marginBottom: "1rem",
            }}
            severity="success"
          >
            Successfully signed out!
          </Alert>
        )}
        <div
          style={{
            margin: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
          className="center"
        >
          <Button
            size="big"
            onClick={() => makeSignoutRequest()}
            variant="contained"
          >
            Are you sure you want to signout?
          </Button>
        </div>
      </main>
    );
}

export default Signout;