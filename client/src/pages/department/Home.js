import { NavLink } from "react-router-dom";
import DepartmentHeader from "../../components/Department-Header";
import Navigation from "@mui/icons-material/Navigation";

const DepartmentHome = () => {
    return (
      <>
        <DepartmentHeader />
        <main className="home">
          <Navigation/>
          <h1>Welcome MATC English department</h1>
          <div className="home">
            <NavLink to="meetings">View Meetings</NavLink>
            <NavLink to="credentials">View Credentials</NavLink>
            <NavLink to="elections">View Elections</NavLink>
            <NavLink to="syllabi">View Syllabi</NavLink>
          </div>
        </main>
      </>
    );
};

export default DepartmentHome;