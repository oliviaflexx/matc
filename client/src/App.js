import "./App.css";
import { axiosInstance } from "./config";
import { Routes, Route } from "react-router-dom";
import Meetings from "./pages/department/Meetings";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Elections from "./pages/department/Elections";
import Credentials from "./pages/department/Credentials";
import Syllabi from "./pages/department/Syllabi";
import Signin from "./pages/admin/Signin";
import Signout from "./pages/admin/Signout";
import DepartmentHome from "./pages/department/Home";
import PublicHome from "./pages/public/Home";
import Events from "./pages/public/Events";
import Faculty from "./pages/public/Faculty";
import FacultyPerson from "./pages/public/FacultyPerson";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function App() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    // const getrooms2 = async () => {
    //   try {
    //     const res = await axiosInstance.post("/api/auth/signup", {
    //       email: "oliviaflexx@gmail.com",
    //       password: "mm7373922",
    //       name: "oliviaflexx",
    //     });

    //     console.log(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getrooms2();

    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/currentuser");
        setUser(res.data.currentUser);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [])

  return (
    // <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="department/meetings" element={<Meetings user={user} />} />
        <Route
          path="department/elections"
          element={<Elections user={user} />}
        />
        <Route
          path="department/credentials"
          element={<Credentials user={user} />}
        />
        <Route path="department/syllabi" element={<Syllabi user={user} />} />
        <Route path="department" element={<DepartmentHome user={user} />} />
        <Route path="/" element={<PublicHome user={user} />} />
        <Route path="/events" element={<Events user={user} />} />
        <Route path="/faculty" element={<Faculty user={user} />} />
        <Route path="/faculty/:id" element={<FacultyPerson user={user} />} />
        <Route
          path="admin/signin"
          element={<Signin user={user} setUser={setUser} />}
        />
        <Route
          path="admin/signout"
          element={<Signout user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
