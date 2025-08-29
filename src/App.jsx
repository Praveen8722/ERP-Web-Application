import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Reset from "./components/Reset";
import MainLayout from "./components/superadmin/common/MainLayout";
import CreateOrganisation from "./components/superadmin/Createorganisation";
import Allorganisation from "./components/superadmin/Allorganisation";
import OrganisationType from "./components/superadmin/OrganisationType";
import Createadmin from "./components/superadmin/Createadmin";
import Displayadmin from "./components/superadmin/Displayadmin";
import AdminLayout from "./components/Admin/common/AdminLayout";
import Createdepartment from "./components/Admin/Createdepartment";
import Viewdepartment from "./components/Admin/Viewdepartment";
import Viewemployee from "./components/Admin/Viewemployee";
import Createemployee from "./components/Admin/Createemployee";
import Employeedetails from "./components/Admin/Employeedetails";
import Createrole from "./components/Admin/Createrole";
import Createdepartmentype from "./components/Admin/Createdepartmenttype";
import Landingpage from "./components/Landingpage/Landingpage";
import EmployeeLayout from "./components/Employee/common/EmployeeLayout";
import Createproject from "./components/Admin/Createproject";
import Status from "./components/Admin/Status";
import Viewproject from "./components/Admin/Viewproject";
import Empprojects from "./components/Employee/Empprojects";
import Viewempproject from "./components/Employee/Viewempproject";
import ApplyLeave from "./components/Employee/ApplyLeave";
import Empsalarystructure from "./components/Employee/Empsalarystructure";
import Leaveapproval from "./components/Admin/Leaveapproval";
import Leavecategory from "./components/Admin/Leavecategory";
import LeaveBalances from "./components/Employee/LeaveBalances";
import Leaveaction from "./components/Admin/Leaveaction";
import ProfileSection from "./components/Admin/ProfileSection"
import Holiday from "./components/Admin/Holiday";
import LeaveHistorydetail from "./components/Employee/LeaveHistorydetail";
import Payroll from "./components/Admin/Payroll";
import Createlevel from "./components/Admin/Createlevel";
import Leavepolicy from "./components/Admin/Leavepolicy";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landingpage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route path="/superadmin/Dashboard" element={<MainLayout />} />

        <Route path="/createorganisation" element={<CreateOrganisation />} />
        <Route
          exact
          index
          path="/allorganisation"
          element={<Allorganisation />}
        />

        <Route
          exact
          index
          path="/organisationtype"
          element={<OrganisationType />}
        />
        <Route exact index path="/createadmin" element={<Createadmin />} />
        <Route exact index path="/viewadmin" element={<Displayadmin />} />

        {/* admin rout */}
        <Route path="/admin/Dashboard" element={<AdminLayout />} />

        <Route
          exact
          index
          path="/createdepartment"
          element={<Createdepartment />}
        />
        <Route
          exact
          index
          path="/createdepartmenttype"
          element={<Createdepartmentype />}
        />
        <Route
          exact
          index
          path="/viewdepartment"
          element={<Viewdepartment />}
        />

        <Route exact index path="/createrole" element={<Createrole />} />

        <Route
          exact
          index
          path="/createemployee"
          element={<Createemployee />}
        />

        <Route exact index path="/viewemployee" element={<Viewemployee />} />
        <Route index path="/employeedetail/:id" element={<Employeedetails />} />

        <Route
          exact
          index
          path="/admins/employeeDetail"
          element={<Employeedetails />}
        />

        <Route exact index path="/createprojects" element={<Createproject />} />

        <Route exact index path="/createstatus" element={<Status />} />

        <Route exact index path="/viewproject" element={<Viewproject />} />
        <Route exact index path="/leaveapproval" element={<Leaveapproval />} />
        <Route
          exact
          index
          path="/createleavecategory"
          element={<Leavecategory />}
        />
        <Route exact index path="/profileSection" element={<ProfileSection />} />
        <Route exact index path="/orgholidays" element={<Holiday />} />
        <Route exact index path="/admin/payroll" element={<Payroll />} />
        <Route exact index path="/createlevel" element={<Createlevel />} />
        <Route
          exact
          index
          path="/createleavepolicy"
          element={<Leavepolicy />}
        />

        {/* employee */}
        <Route
          exact
          index
          path="/employee/Dashboard"
          element={<EmployeeLayout />}
        />

        <Route exact index path="/employeeprojects" element={<Empprojects />} />
        <Route
          exact
          index
          path="/viewempproject"
          element={<Viewempproject />}
        />

        <Route exact index path="/applyleave" element={<ApplyLeave />} />
        <Route exact index path="Empsalarystructure" element={<Empsalarystructure />} />
        <Route exact index path="/leavebalance" element={<LeaveBalances />} />
        <Route path="/leave-details" element={<Leaveaction />} />
        <Route
          exact
          index
          path="/leavehistorydetails"
          element={<LeaveHistorydetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
