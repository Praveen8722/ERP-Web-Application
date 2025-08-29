import React, { useContext, useState, useEffect } from "react";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import AdminContext from "../context/AdminContext";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";


const Createdepartment = ({ children }) => {
  const initialFormData = {
    departmentname: "",
    departmentType: [],
  };

  const [data, setData] = useState(initialFormData);
  const [alldepartmentTypes, setAllDepartmentTypes] = useState([]);
  const { Createdepartment, getDepartmentTypes, departmentChanged } =
    useContext(AdminContext);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    fetchAllDepartmentTypes();
  }, [departmentChanged]);

  const fetchAllDepartmentTypes = async () => {
    try {
      const response = await getDepartmentTypes();
      setAllDepartmentTypes(response.resultData);
    } catch (error) {
      console.error("Error fetching organisation types:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Createdepartment(data);
      alert("Department created successfully");
      setData(initialFormData);
    } catch (error) {
      console.error("Error creating department:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleDepartmentTypeChange = (event) => {
    const { value } = event.target;
    setData({ ...data, departmentType: value });
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
            padding: "20px 30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              color="#abafdb"
              fontFamily={"revert"}
              fontSize={"22px"}
              fontWeight={"550"}
            >
              Create Department
            </Typography>
          </Box>
        </Paper>
        <main
          style={{
            padding: "20px",
            width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
            marginLeft: collapsed ? "100px" : "270px",
            marginTop: "180px",
            flexGrow: 1,
            background: "white",
          }}
        >
          {children}
          <div className="page-wrapper">
            <div className="content container-fluid">
              <Paper
                sx={{ width: { md: "70rem" }, marginLeft: { md: "0rem" } }}
              >
                <div className="card px-5 py-5" >
                  <div className="card-body">
                    <Typography
                      variant="h5"
                      gutterBottom
                      fontFamily={"revert"}
                      fontSize={"22px"}
                      fontWeight={"550"}
                      className="pb-3"
                    >
                      Department details
                    </Typography>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="form-group row pb-3">
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Department name
                            </Typography>
                            <Box
                              className="form-control"
                              sx={{
                                marginLeft: { md: "0.7rem" },
                                maxWidth: { md: "20rem" },
                                width: { md: "20rem" },
                              }}
                            >
                              <TextField
                                variant="standard"
                                name="departmentname"
                                value={data.departmentname}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </div>
                          <div className="form-group row pb-3">
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Department Types
                            </Typography>
                            <FormControl sx={{ m: 1, width: "100%" }}>
                              <Select
                                labelId="departmentType-label"
                                id="departmentType"
                                multiple
                                value={data.departmentType}
                                onChange={handleDepartmentTypeChange}
                                input={
                                  <OutlinedInput id="select-multiple-checkbox" />
                                } 
                                renderValue={(selected) => selected.join(", ")}
                                sx={{
                                  width: { md: "20rem" },
                                  height: "2.9rem",
                                  marginLeft: { xs: "-0.5rem", md: "0.2rem" },
                                  marginRight: { xs: "0.5rem" },
                                }}
                              >
                                {alldepartmentTypes.map((type) => (
                                  <MenuItem key={type._id} value={type.name}>
                                    <Checkbox
                                      checked={data.departmentType.includes(
                                        type.name
                                      )}
                                    />{" "}
                                  
                                    <ListItemText primary={type.name} />{" "}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <Grid
                        className="text-end"
                        container
                        justifyContent="flex-start"
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </form>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Createdepartment;
