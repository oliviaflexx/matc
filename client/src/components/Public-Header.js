import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const PublicHeader = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <nav className="public">
        <div className="left">
          <NavLink to="/">MATC</NavLink>
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
            <NavLink to="/faculty">Faculty</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink id="bottom" to="/department">Department Access</NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicHeader;
