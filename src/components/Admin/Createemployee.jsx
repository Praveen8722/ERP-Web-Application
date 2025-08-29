import React, { useState, useContext, useEffect } from "react";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import AdminContext from "../context/AdminContext";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Container,
  Grid,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Select,
  FormControl,
  Breadcrumbs,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const CreateEmployee = ({ children }) => {
  const initialFormData = {
    employeeName: "",
    employeeEmail: "",
    personalEmail: "",
    department: "",
    phone: "",
    alternatephone: "",
    DOB: "",
    Gender: "",
    MaritalStatus: "",
    SelectLevel: "",
    Address1: "",
    Address2: "",
    Pincode: '',
    Bankname: '',
    Accountnumber: '',
    IFSC: '',
    empid: "",
    role: "",
    govIds: [{ govIdType: "", govIdNumber: "" }],
    education: [{ collegeName: '', course: '', universityName: '', from: '', to: '', isCurrently: false }],
  };
  const [collapsed, setCollapsed] = useState(false);
  const [levels, setLevels] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [isCurrently, setIsCurrently] = useState(false);
  const [country, setCountry] = useState({ id: '', name: '' });
  const [state, setState] = useState({ id: '', name: '' });
  const [city, setCity] = useState({ id: '', name: '', latitude: '', longitude: '' });
  const [language, setLanguage] = useState({ id: '', name: '' });

  const handleToggle = () => {
    setShowFields(!showFields);
  };



  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const [data, setData] = useState(initialFormData);
  const { getDepartments, getRoles, createEmployee, roleChanged, getLevel } =
    useContext(AdminContext);
  const [allDepartments, setDepartments] = useState([]);
  const [allRoles, setRoles] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchRoles();
    fetchLevel();
  }, [roleChanged]);
  const fetchLevel = async () => {
    try {
      const response = await getLevel();
      setLevels(response.Success);

    } catch (error) {
      console.error("Error fetching department types:", error);
    }
  };
  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response?.resultData || []);
    } catch (error) {
      console.error("Error fetching departments:", error.message);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response || []);
    } catch (error) {
      console.error("Error fetching roles:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
     await createEmployee({
    employeeName:data.employeeName,
    employeeEmail:data.employeeEmail,
    personalEmail: data.personalEmail,
    department:data.department,
    phone:data.phone,
    alternatephone:data.alternatephone,
    DOB:data.DOB,
    Gender: data.Gender,
    MaritalStatus:data.MaritalStatus,
    SelectLevel:data.SelectLevel,
    Address1: data.Address1,
    Address2:data.Address2,
    Pincode:data.Pincode,
    Bankname:data.Bankname,
    Accountnumber:data.Accountnumber,
    IFSC: data.IFSC,
    empid: data.empid,
    role: data.role,
    govIds: data.govIds,
    education:data.education,
    country:country.name,
    state:state.name,
    city:city.name,
    language:language.name,
      });

      setData(initialFormData);
      setCountry({ id: '', name: ''});
      setCity({ id: '', name: '', latitude: '', longitude: '' });
      setState({ id: '', name: '' });
      setLanguage({ id: '', name: '' });
    } catch (error) {
      console.error("Error creating employee:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleGovIdChange = (index, e) => {
    const { name, value } = e.target;
    const govIds = [...data.govIds];
    govIds[index][name] = value;
    setData({ ...data, govIds });
  };

  const addGovIdField = () => {
    setData({
      ...data,
      govIds: [...data.govIds, { govIdType: "", govIdNumber: "" }],
    });
  };

  const removeGovIdField = (index) => {
    const govIds = [...data.govIds];
    govIds.splice(index, 1);
    setData({ ...data, govIds });
  };
  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const newEducation = [...data.education];
    newEducation[index][name] = value;
    setData({ ...data, education: newEducation });
  };

  const handleCheckboxChangeedu = (index) => {
    const newEducation = [...data.education];
    newEducation[index].isCurrently = !newEducation[index].isCurrently;
    setData({ ...data, education: newEducation });
  };

  const addEducationField = () => {
    setData({ ...data, education: [...data.education, { collegeName: '', course: '', universityName: '', from: '', to: '', isCurrently: false }] });
  };

  const removeEducationField = (index) => {
    const newEducation = data.education.filter((_, i) => i !== index);
    setData({ ...data, education: newEducation });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            marginTop: "70px",
            zIndex: 2000,
            width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
            marginLeft: collapsed ? "100px" : "270px",
            padding: "20px 10px",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              color="#abafdb"
              fontFamily={"revert"}
              fontSize={"22px"}
              fontWeight={"550"}
            >
              Onboard Employee
            </Typography>
          </Breadcrumbs>
        </Paper>
        <main
          style={{
            padding: "20px",
            width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
            marginLeft: collapsed ? "100px" : "270px",
            marginTop: "50px",
            flexGrow: 1,
            background: "white",
          }}
        >
          {children}
          <Box>
            <Container
              sx={{
                marginLeft: { md: "0rem" },
                marginTop: { md: "8rem" },
                width: { md: "90rem" },
                padding: "20px",
              }}
            >
              <Paper className="px-5 py-2">
                <CardContent sx={{ marginTop: { md: "1rem", xs: "3rem" } }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    fontFamily={"revert"}
                    fontSize={"22px"}
                    fontWeight={"550"}
                    className="pb-2"
                  >
                    Employee Details
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      {/* Left Column */}
                      <Grid item xs={12} md={6}>
                        {/* Employee ID */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Employee ID
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="empid"
                                value={data.empid}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                        {/* Employee Name */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Employee Name
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="employeeName"
                                value={data.employeeName}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Official Email ID */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Official Email ID
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                type="email"
                                name="employeeEmail"
                                value={data.employeeEmail}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Personal Email ID */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Personal Email ID
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                type="email"
                                name="personalEmail"
                                value={data.personalEmail}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Phone */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Phone Number
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="phone"
                                value={data.phone}
                                onChange={handleChange}
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Alternate Phone Number */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Alternate Phone Number
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="alternatephone"
                                value={data.alternatephone}
                                onChange={handleChange}
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* DOB */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily="revert"
                              fontSize="16px"
                              fontWeight="550"
                            >
                              Date of Birth
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="DOB"
                                type="date"
                                value={data.DOB}
                                onChange={handleChange}
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Gender */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Gender
                            </Typography>
                            <Box className="form-control">
                              <Select
                                fullWidth
                                variant="standard"
                                name="Gender"
                                value={data.Gender}
                                onChange={handleChange}
                                required
                                displayEmpty
                                inputProps={{ "aria-label": "Gender" }}
                                sx={{
                                  "&::before, &::after": {
                                    display: "none",
                                  },
                                }}
                              >
                                <MenuItem value="">Select Gender</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                              </Select>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Marital Status */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Marital Status
                            </Typography>
                            <Box className="form-control">
                              <Select
                                fullWidth
                                variant="standard"
                                name="MaritalStatus"
                                value={data.MaritalStatus}
                                onChange={handleChange}
                                required
                                displayEmpty
                                inputProps={{ "aria-label": "Marital Status" }}
                                sx={{
                                  "&::before, &::after": {
                                    display: "none", // Remove the underline
                                  },
                                }}
                              >
                                <MenuItem value="" disabled>
                                  Select Status
                                </MenuItem>
                                <MenuItem value="Single">Single</MenuItem>
                                <MenuItem value="Married">Married</MenuItem>
                                <MenuItem value="Divorced">Divorced</MenuItem>
                              </Select>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Government IDs */}
                        {data.govIds.map((govId, index) => (
                          <Grid
                            container
                            spacing={2}
                            sx={{ marginBottom: "1rem" }}
                            key={index}
                          >
                            <Grid item xs={12}>
                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                fontFamily="revert"
                                fontSize="16px"
                                fontWeight="550"
                              >
                                Select Government ID Type
                              </Typography>
                              <Box className="form-control">
                                <Select
                                  fullWidth
                                  variant="standard"
                                  name="govIdType"
                                  value={govId.govIdType}
                                  onChange={(e) =>
                                    handleGovIdChange(index, e)
                                  }
                                  displayEmpty
                                  inputProps={{
                                    "aria-label": "Select Government ID Type",
                                  }}
                                  required
                                  sx={{
                                    "&::before, &::after": {
                                      display: "none",
                                    },
                                  }}
                                >
                                  <MenuItem value="">
                                    Select ID Type
                                  </MenuItem>
                                  <MenuItem value="aadhar">Aadhar</MenuItem>
                                  <MenuItem value="pan">PAN</MenuItem>
                                  <MenuItem value="other">Other</MenuItem>
                                </Select>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                fontFamily="revert"
                                fontSize="16px"
                                fontWeight="550"
                              >
                                {govId.govIdType === "other"
                                  ? "Enter ID Number"
                                  : `${govId.govIdType.toUpperCase()} Number`}
                              </Typography>
                              <Box className="form-control">
                                <TextField
                                  fullWidth
                                  variant="standard"
                                  name="govIdNumber"
                                  value={govId.govIdNumber}
                                  onChange={(e) => handleGovIdChange(index, e)}
                                  required
                                  InputProps={{ disableUnderline: true }}
                                />
                              </Box>
                              <IconButton
                                onClick={() => removeGovIdField(index)}
                                disabled={data.govIds.length === 1}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                        <Button
                          onClick={addGovIdField}
                          variant="outlined"
                          color="primary"
                        >
                          Add Government ID
                        </Button>

                      </Grid>

                      {/* Right Column */}
                      <Grid item xs={12} md={6}>
                        {/*  Select Level */}
                        <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Select Level
                            </Typography>
                            <Box className="form-control">
                              <Select
                                fullWidth
                                variant="standard"
                                name="SelectLevel"
                                value={data.SelectLevel || ""}
                                onChange={handleChange}
                                required
                                displayEmpty
                                inputProps={{ "aria-label": "SelectLevel" }}
                                sx={{
                                  "&::before, &::after": {
                                    display: "none",
                                  },
                                }}
                              >
                                <MenuItem value="">Select Level</MenuItem>
                                {levels.map((level) => (
                                  <MenuItem key={level._id} value={level._id}>
                                    {level.levelName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Department */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily="revert"
                              fontSize="16px"
                              fontWeight="550"
                            >
                              Select Department
                            </Typography>
                            <Box className="form-control">
                              <Select
                                fullWidth
                                variant="standard"
                                name="department"
                                value={data.department}
                                onChange={handleChange}
                                required
                                displayEmpty
                                inputProps={{ "aria-label": "Select Department" }}
                                sx={{
                                  "&::before, &::after": {
                                    display: "none",
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  Select Department
                                </MenuItem>
                                {allDepartments.map((department) => (
                                  <MenuItem
                                    key={department._id}
                                    value={department._id}
                                  >
                                    {department.departmentName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Role */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Select Role
                            </Typography>
                            <Box className="form-control">
                              <Select
                                fullWidth
                                variant="standard"
                                name="role"
                                value={data.role}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ "aria-label": "Select Role" }}
                                required
                                sx={{
                                  "&::before, &::after": {
                                    display: "none",
                                  },
                                }}
                              >
                                <MenuItem value="">
                                  Select Role
                                </MenuItem>
                                {allRoles.map((role) => (
                                  <MenuItem key={role._id} value={role._id}>
                                    {role.roleName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Address-1 */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Address-1
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="Address1"
                                value={data.Address1}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Address-2 */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Address-2
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="Address2"
                                value={data.Address2}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Pincode */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Pincode
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="Pincode"
                                value={data.Pincode}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Country */}
                        <Stack spacing={2} sx={{ marginBottom: '1rem' }}>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily="revert"
                              fontSize="16px"
                              fontWeight="550"
                            >
                              Country
                            </Typography>
                            <CountrySelect
                              onChange={(e) => {
                                setCountry({ id: e.id, name: e.name });
                              }}
                              placeHolder="Select Country"
                            />
                          </Box>

                          <Box>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily="revert"
                              fontSize="16px"
                              fontWeight="550"
                            >
                              State
                            </Typography>
                            <StateSelect
                              countryid={country.id}
                              onChange={(e) => {
                                setState({ id: e.id, name: e.name });
                              }}
                              placeHolder="Select State"
                            />
                          </Box>

                          <Box>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily="revert"
                              fontSize="16px"
                              fontWeight="550"
                            >
                              City
                            </Typography>
                            <CitySelect
                              countryid={country.id}
                              stateid={state.id}
                              onChange={(e) => {
                                setCity({ id: e.id, name: e.name, latitude: e.latitude, longitude: e.longitude });
                              }}
                              placeHolder="Select City"
                            />
                          </Box>

                          <Box>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily="revert"
                              fontSize="16px"
                              fontWeight="550"
                            >
                              Language
                            </Typography>
                            <LanguageSelect
                              onChange={(e) => {
                                setLanguage({ id: e.id, name: e.name });
                              }}
                              placeHolder="Select Language"
                            />
                          </Box>
                        </Stack>

                        {/* Bank Name */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Bank Name
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="Bankname"
                                value={data.Bankname}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Account Number */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Account Number
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="Accountnumber"
                                value={data.Accountnumber}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* IFSC Code */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: "1rem" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              IFSC Code
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="IFSC"
                                value={data.IFSC}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid sx={{ marginTop: { md: "-2.8rem", xs: "1rem" } }}>
                      {data.education.map((education, index) => (
                        <Grid container spacing={2} sx={{ marginBottom: "1rem" }} key={index}>
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              College Name
                            </Typography>
                            <Box className="form-control" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <TextField
                                fullWidth
                                variant="standard"
                                name="collegeName"
                                value={education.collegeName}
                                onChange={(e) => handleEducationChange(index, e)}
                                required
                                InputProps={{ disableUnderline: true }}
                                sx={{ textAlign: 'right' }}
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              University Name
                            </Typography>
                            <Box className="form-control" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <TextField
                                fullWidth
                                variant="standard"
                                name="universityName"
                                value={education.universityName}
                                onChange={(e) => handleEducationChange(index, e)}
                                required
                                InputProps={{ disableUnderline: true }}
                                sx={{ textAlign: 'right' }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Course
                            </Typography>
                            <Box className="form-control" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <TextField
                                fullWidth
                                variant="standard"
                                name="course"
                                value={education.course}
                                onChange={(e) => handleEducationChange(index, e)}
                                required
                                InputProps={{ disableUnderline: true }}
                                sx={{ textAlign: 'right' }}
                              />
                            </Box>
                          </Grid>
                          <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
                            <Grid item xs={12} md={6}>
                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                fontFamily={"revert"}
                                fontSize={"16px"}
                                fontWeight={"550"}
                              >
                                From
                              </Typography>
                              <Box className="form-control" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <TextField
                                  fullWidth
                                  type="month"
                                  variant="standard"
                                  name="from"
                                  value={education.from}
                                  onChange={(e) => handleEducationChange(index, e)}
                                  required
                                  InputProps={{ disableUnderline: true }}
                                  sx={{ textAlign: 'right' }}
                                  placeholder="MM/YYYY"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                fontFamily={"revert"}
                                fontSize={"16px"}
                                fontWeight={"550"}
                              >
                                To
                              </Typography>
                              <Box className="form-control" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <TextField
                                  fullWidth
                                  type="month"
                                  variant="standard"
                                  name="to"
                                  value={education.to}
                                  onChange={(e) => handleEducationChange(index, e)}
                                  required
                                  InputProps={{ disableUnderline: true }}
                                  sx={{ textAlign: 'right' }}
                                  placeholder="MM/YYYY"
                                  disabled={education.isCurrently}
                                />
                              </Box>
                            </Grid>
                          </Grid>

                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <input
                                type="checkbox"
                                id={`currently-${index}`}
                                checked={education.isCurrently}
                                onChange={() => handleCheckboxChangeedu(index)}
                              />
                              <label htmlFor={`currently-${index}`} style={{ marginLeft: '8px' }}>
                                Currently studying
                              </label>
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <IconButton onClick={() => removeEducationField(index)} disabled={data.education.length === 1}>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Button onClick={addEducationField} variant="outlined" color="primary">
                        Add Education
                      </Button>
                      <Box display="flex" justifyContent="flex-end" sx={{ mt: '-4rem' }}>
                        <Button type="submit" variant="contained" color="primary">
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                  </form>
                </CardContent>
              </Paper>
            </Container>
          </Box>
        </main>
      </div>
    </div>
  );
};

export default CreateEmployee;
