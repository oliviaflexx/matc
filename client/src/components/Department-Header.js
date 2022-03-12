import { NavLink } from "react-router-dom"
import { IconButton } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import logo from "./logo.png";


const DepartmentHeader = () => {
  const [showNav, setShowNav] = useState(false);

    return (
      <>
        <nav className="department">
          <div className="left">
            <NavLink to="/department">
              <img className="logo" src={logo}></img>
            </NavLink>
          </div>
          <div className="right">
            <IconButton
              sx={{
                color: "#1e69b3",
              }}
              onClick={() => setShowNav(true)}
              aria-label="open"
            >
              <DehazeIcon />
            </IconButton>
          </div>
        </nav>
        {showNav && (
          <div className="overlay" style={{ animation: `fadeIn .5s` }}>
            <div className="sidebar">
              <IconButton
                id="close"
                onClick={() => setShowNav(false)}
                aria-label="close"
                sx={{
                  color: "black",
                }}
              >
                <CloseIcon />
              </IconButton>
              <NavLink to="/department/meetings">Meetings</NavLink>
              <NavLink to="/department/credentials">Credentials</NavLink>
              <NavLink to="/department/elections">Elections</NavLink>
              <NavLink to="/department/syllabi">Syllabi</NavLink>
            </div>
          </div>
        )}
      </>
    );
}

export default DepartmentHeader;