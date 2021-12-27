import { NavLink } from "react-router-dom"

const DepartmentHeader = () => {
    return (
      <nav className="department">
        <div className="left">
          <NavLink to="/department">MATC logo</NavLink>
        </div>
        <div className="right">
          <NavLink to="/department/meetings">Meetings</NavLink>
          <NavLink to="/department/credentials">Credentials</NavLink>
          <NavLink to="/department/elections">Elections</NavLink>
          <NavLink to="/department/syllabi">Syllabi</NavLink>
        </div>
      </nav>
    );
}

export default DepartmentHeader;