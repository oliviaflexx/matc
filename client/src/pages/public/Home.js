import { NavLink } from "react-router-dom";
import PublicHeader from "../../components/Public-Header";

const PublicHome = ({ user }) => {
  return (
    <>
      <PublicHeader />
      <main className="home">
        <h1>Welcome to the MATC English department</h1>
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
