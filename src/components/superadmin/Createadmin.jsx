import React, { useState, useContext, useEffect } from "react";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import SuperAdminContext from "../context/SuperAdminContext";
import {
  Container,
  Grid,
  Card,
  CardContent,
  InputLabel,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  Breadcrumbs,
  Box,
} from "@mui/material";
import Paper from "@mui/material/Paper";
const Createadmin = ({ children }) => {
  const initialFormData = {
    adminName: "",
    adminEmail: "",
    org: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [data, setData] = useState(initialFormData);
  const { getorganisations, createAdmin } = useContext(SuperAdminContext);
  const [allorganisation, setOrganisation] = useState([]);

  useEffect(() => {
    fetchorganisation();
  }, []);

  const fetchorganisation = async () => {
    try {
      const response = await getorganisations();
      console.log(response.resultData);
      setOrganisation(response.resultData);
    } catch (error) {
      console.error("Error fetching organisations:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (data.password !== data.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await createAdmin({
        adminName: data.adminName,
        adminEmail: data.adminEmail,
        org: data.org,
        phone: data.phone,
        password: data.password,
      });

      setData(initialFormData);
    } catch (error) {
      console.error("Error creating admin:", error.message);
    }
  };
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
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
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              color="#abafdb"
              fontFamily={"revert"}
              fontSize={"22px"}
              fontWeight={"550"}
            >
              Create Admin
            </Typography>
          </Breadcrumbs>
        </Paper>
        <main
          style={{
            padding: "20px",
            width: collapsed ? "calc(100% - 100px)" : "calc(100% - 270px)",
            marginLeft: collapsed ? "100px" : "270px",
            marginTop: "80px",
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
                width: { md: "80rem" },
                padding: "20px",
              }}
            >
              <Paper
                sx={{
                  padding: "20px",
                }}
              >
                <CardContent sx={{ marginTop: { md: "1rem", xs: "3rem" } }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    fontFamily={"revert"}
                    fontSize={"22px"}
                    fontWeight={"550"}
                    className="mb-3"
                  >
                    Admin Details
                  </Typography>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <Grid container spacing={15}>
                      {/* Left Column */}
                      <Grid item xs={12} md={6}>
                        {/* Admin Name */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: { md: "2rem" } }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Admin Name
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="adminName"
                                value={data.adminName}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Admin Email */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: { md: "2rem" } }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Admin Email
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                type="email"
                                name="adminEmail"
                                value={data.adminEmail}
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
                          sx={{ marginBottom: { md: "2rem" } }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Phone
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
                      </Grid>

                      {/* Right Column */}
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ marginTop: { xs: "-7rem", md: "2px" } }}
                      >
                        {/* Organisation */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: { md: "2rem" }}}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily="revert"
                              fontSize="16px"
                              fontWeight="550"
                            >
                              Select Organisation
                            </Typography>
                            <Box>
                              <FormControl
                                fullWidth
                                sx={{ marginBottom: "2rem",padding:'0px' }}
                              >
                                {/* <Typography variant="subtitle1" gutterBottom fontFamily="revert" fontSize="16px" fontWeight="550">
                        Select Organisation
                      </Typography> */}
                                <Select
                                  name="org"
                                  value={data.org}
                                  onChange={handleChange}
                                  displayEmpty
                                  inputProps={{
                                    "aria-label": "Select Organisation",
                                  }}
                                  required
                                  // variant="standard"
                                  InputProps={{ disableUnderline: true }}
                                >
                                  <MenuItem value="">
                                    {/* <em>Select Organisation</em> */}
                                  </MenuItem>
                                  {allorganisation.map((org) => (
                                    <MenuItem key={org._id} value={org._id}>
                                      {org.organisationName}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Password */}
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            marginBottom: { md: "2rem" },
                            marginTop: "-2.7rem",
                          }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Password
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Confirm Password */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: { md: "2rem" } }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Confirm Password
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                type="password"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Submit Button */}
                    <Grid
                      container
                      justifyContent="flex-end"
                      spacing={2}
                      sx={{ marginTop: { xs: "1rem" } }}
                    >
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Create Admin
                        </Button>
                      </Grid>
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

export default Createadmin;
