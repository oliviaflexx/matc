import { NavLink } from "react-router-dom";
import PublicHeader from "../../components/Public-Header";
import bg from "../matc_bg.png";

const PublicHome = ({ user }) => {
  return (
    <>
      <PublicHeader />
      <main
        className="home"
        // style={{
        //   backgroundImage:
        //     "url(https://madison365.com/wp-content/uploads/2021/10/matc-lg.png)",
        // }}

      >
        <h1>
          Welcome to the Milwaukee Area Technical College English department
        </h1>
        <div className="home">
          <NavLink to="/faculty">View Faculty</NavLink>
          <NavLink to="/courses">View Courses</NavLink>
          <NavLink to="/events">View Events</NavLink>
        </div>
      </main>
    </>
  );
};

export default PublicHome;
