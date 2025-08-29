import React, { useContext, useState, useEffect } from "react";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import SuperAdminContext from "../context/SuperAdminContext";
import {
  Container,
  Grid,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  Breadcrumbs,
  Box,
  Paper,
  Checkbox,
  ListItemText,
} from "@mui/material";

const CreateOrganisation = ({ children }) => {
  const initialFormData = {
    organisationName: "",
    headOfOrganisation: "",
    services: [],
    phone: "",
    email: "",
    address1: "",
    address2: "",
    pincode: "",
    country: "",
    city: "",
  };
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const initialErrors = {
    organisationName: "",
    headOfOrganisation: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    pincode: "",
    country: "",
    city: "",
  };
  const [data, setData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [allOrganisationTypes, setAllOrganisationTypes] = useState([]);
  const { createorganisations, getorganisationsType } =
    useContext(SuperAdminContext);

  useEffect(() => {
    fetchOrganisationTypes();
  }, []);

  const fetchOrganisationTypes = async () => {
    try {
      const response = await getorganisationsType();
      setAllOrganisationTypes(response);
    } catch (error) {
      console.error("Error fetching organisation types:", error.message);
    }
  };

  const validate = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!data.organisationName) {
      newErrors.organisationName = "Organisation Name is required";
      isValid = false;
    }

    if (!data.headOfOrganisation) {
      newErrors.headOfOrganisation = "Head of Organisation is required";
      isValid = false;
    }

    if (!data.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d+$/.test(data.phone)) {
      newErrors.phone = "Phone number must be digits only";
      isValid = false;
    }

    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email format is invalid";
      isValid = false;
    }

    if (!data.address1) {
      newErrors.address1 = "Address 1 is required";
      isValid = false;
    }

    if (!data.pincode) {
      newErrors.pincode = "Pincode is required";
      isValid = false;
    }

    if (!data.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    if (!data.city) {
      newErrors.city = "City is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      await createorganisations(data);
      alert("Organisation created successfully");
      setData(initialFormData);
    } catch (error) {
      console.error("Error creating organisation:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOrganisationTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setData({
      ...data,
      services: typeof value === "string" ? value.split(",") : value,
    });
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
            padding:'20px 10px'
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              color="#abafdb"
              fontFamily={"revert"}
              fontSize={"22px"}
              fontWeight={"550"}
            >
              Create Organisation
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
              }}
            >
              <Paper>
                <CardContent
                  sx={{
                    marginTop: { md: "1rem", xs: "3rem" },
                    padding: " 30px 45px ",
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    fontFamily={"revert"}
                    fontSize={"22px"}
                    fontWeight={"550"}
                    className="mb-4"
                  >
                    Organisation Details
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={15}>
                      {/* Left Column */}
                      <Grid item xs={12} md={6}>
                        {/* Organisation Name */}
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
                              Organisation Name
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="organisationName"
                                value={data.organisationName}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                                error={Boolean(errors.organisationName)}
                                helperText={errors.organisationName}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Head of Organisation */}
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
                              Head of Organisation
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="headOfOrganisation"
                                value={data.headOfOrganisation}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                                error={Boolean(errors.headOfOrganisation)}
                                helperText={errors.headOfOrganisation}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Organisation Types */}
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginBottom: { md: "1rem" } }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              fontFamily={"revert"}
                              fontSize={"16px"}
                              fontWeight={"550"}
                            >
                              Organisation Types
                            </Typography>
                            <FormControl
                              fullWidth
                              sx={{ marginBottom: "1rem" }}
                            >
                              <Select
                                multiple
                                value={data.services}
                                onChange={handleOrganisationTypeChange}
                                renderValue={(selected) =>
                                  selected
                                    .map(
                                      (value) =>
                                        allOrganisationTypes.find(
                                          (type) => type._id === value
                                        )?.servicesType
                                    )
                                    .join(", ")
                                }
                                inputProps={{
                                  "aria-label": "Select Organisation Types",
                                }}
                              >
                                {allOrganisationTypes.map(
                                  (organisationType) => (
                                    <MenuItem
                                      key={organisationType._id}
                                      value={organisationType._id}
                                    >
                                      <Checkbox
                                        checked={data.services.includes(
                                          organisationType._id
                                        )}
                                      />
                                      <ListItemText
                                        primary={organisationType.servicesType}
                                      />
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                        {/* Email */}
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
                              Email
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
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
                                error={Boolean(errors.phone)}
                                helperText={errors.phone}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Right Column */}
                      <Grid item xs={12} md={6}>
                        {/* Address 1 */}
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
                              Address 1
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="address1"
                                value={data.address1}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                                error={Boolean(errors.address1)}
                                helperText={errors.address1}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Address 2 */}
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
                              Address 2
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="address2"
                                value={data.address2}
                                onChange={handleChange}
                                InputProps={{ disableUnderline: true }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                        {/* City */}
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
                              City
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="city"
                                value={data.city}
                                onChange={handleChange}
                                InputProps={{ disableUnderline: true }}
                                error={Boolean(errors.city)}
                                helperText={errors.city}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Pincode */}
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
                              Pincode
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="pincode"
                                value={data.pincode}
                                onChange={handleChange}
                                required
                                InputProps={{ disableUnderline: true }}
                                error={Boolean(errors.pincode)}
                                helperText={errors.pincode}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Country */}
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
                              Country
                            </Typography>
                            <Box className="form-control">
                              <TextField
                                fullWidth
                                variant="standard"
                                name="country"
                                value={data.country}
                                onChange={handleChange}
                                InputProps={{ disableUnderline: true }}
                                error={Boolean(errors.country)}
                                helperText={errors.country}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Submit Button */}
                    <Box textAlign="right" mt={4}>
                      <Button type="submit" variant="contained" color="primary">
                        Create Organisation
                      </Button>
                    </Box>
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

export default CreateOrganisation;
