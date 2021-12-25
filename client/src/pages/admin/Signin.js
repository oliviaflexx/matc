import { axiosInstance } from "../../config";
import { useState, useEffect } from "react";
import { Alert, Button, TextField, IconButton, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const makeSigninRequest = async () => {
      try {
        
        const res = await axiosInstance.post(
          '/api/auth/signin',
          {
            name: username,
            email: email,
            password: password,
          }
        );
      
        setSuccess(true);
        const timerId = setTimeout(() => {
          navigate("/department");
        }, 1500);

      } catch (err) {
        setErrors(err.response.data.errors);
      }
    };

   return (
     <main>
       <h1>Sign in</h1>
       {success && (
         <Alert
           sx={{
             marginBottom: "1rem",
           }}
           severity="success"
         >
           Successfully signed in!
         </Alert>
       )}
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
       <FormGroup
         sx={{
           maxWidth: "300px",
           margin: "auto",
         }}
       >
         <TextField
           label="Username"
           required={true}
           onChange={(e) => setUsername(e.target.value)}
         ></TextField>
         <TextField
           label="Email"
           type="email"
           required={true}
           sx={{
             marginTop: "1rem",
             width: "-webkit-fill-available",
           }}
           onChange={(e) => setEmail(e.target.value)}
         ></TextField>
         <TextField
           label="Password"
           type="password"
           required={true}
           sx={{
             marginTop: "1rem",
             width: "-webkit-fill-available",
           }}
           onChange={(e) => setPassword(e.target.value)}
         ></TextField>
         <Button
           sx={{
             marginTop: "1rem",
           }}
           size="big"
           variant="contained"
           onClick={() => makeSigninRequest()}
         >
           Sign in
         </Button>
       </FormGroup>
     </main>
   );
};

export default Signin;
