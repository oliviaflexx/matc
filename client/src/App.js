import logo from "./logo.svg";
import "./App.css";
import { axiosInstance } from "./config";
import { Routes, Route, useParams } from "react-router-dom";
import Meetings from "./pages/department/Meetings";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Elections from "./pages/department/Elections";
import Signin from "./pages/admin/Signin";
import Signout from "./pages/admin/Signout";

function App() {
    const [user, setUser] = useState("");
  // const getrooms = async () => {
  //   try {
  //     // const res = await axiosInstance.post("/api/auth/signup", {email: "oliviaflexx@gmail.com", password: "mm7373922", name: "oliviaflexx"});
  //     const res = await axiosInstance.post("/api/credentials/", {
  //       title: "a credential",
  //       url: "something.com",
  //     });
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  
  useEffect(() => {
    const getrooms2 = async () => {
      try {
        const res = await axiosInstance.post("/api/auth/signup", {
          email: "oliviaflexx@gmail.com",
          password: "mm7373922",
          name: "oliviaflexx",
        });

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getrooms2();

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
    <BrowserRouter>
      <Routes>
        <Route path="department/meetings" element={<Meetings user={user} />} />
        {/* <Route path="meetings" element={<Meetings user={{id: "123"}} />} /> */}
        <Route
          path="department/elections"
          element={<Elections user={user} />}
        />
        <Route path="admin/signin" element={<Signin user={user} />} />
        <Route path="admin/signout" element={<Signout user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
