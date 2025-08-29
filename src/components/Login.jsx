import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import EmailIcon from "@mui/icons-material/Email";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { apiPath } from './Constents';

const Login= () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    // navigate("/superadmin/Dashboard");
      // navigate("/employee/Dashboard");
      navigate("/admin/Dashboard");
        // navigate("/");




    // const response = await fetch(apiPath + "/superAdmin/login", {
    //   method: "POST",
    //   body: JSON.stringify(credentials),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const json = await response.json();
    // console.log(json);

    // if (json.success) {
    //   localStorage.setItem('token', json.token);

    //   if (json.user.role === 'superAdmin') {
    //     navigate("/superadmin/Dashboard");
    //   } else if (json.user.role === 'admin') {
    //     navigate("/admin/Dashboard");
    //   }
    //   else if(json.user.role=='employee')
    //   {
    //     navigate("/employee/Dashboard");
    //   }
    // } else {
    //   navigate("/");
    // }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onCaptchaChange = (value) => {
    console.log("Captcha value:", value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      className="logo-bg"
    >
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ padding: "1rem 1rem", margin: "0% 1%" }}>
          <Grid container spacing={5}>
            {/* Left side image */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src="assets/img/login-banner.png"
                  alt="Login Banner"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
            </Grid>
            {/* Right side form */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px", // Added margin bottom
                }}
              >
                <img src="/assets/img/logo-red-black.png" alt="Logo" width="100px" height="70px" />
              </Box>
              <Paper elevation={3} sx={{ padding: "40px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      color: "#6777ef",
                      fontWeight: "700",
                      marginBottom: "1rem",
                    }}
                  >
                    Login
                  </Typography>
                  <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Box sx={{ marginBottom: "1rem", width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <EmailIcon color="action" fontSize="small" />
                        <TextField
                          placeholder="Email"
                          variant="standard"
                          fullWidth
                          name="email"
                          value={credentials.email}
                          onChange={onChange}
                          InputProps={{
                            sx: {
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                            },
                          }}
                          sx={{ marginLeft: "10px", width: "100%" }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <LockOpenTwoToneIcon color="action" fontSize="small" />
                        <TextField
                          placeholder="Password"
                          variant="standard"
                          fullWidth
                          type="password"
                          name="password"
                          value={credentials.password}
                          onChange={onChange}
                          sx={{ marginLeft: "10px", width: "100%" }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="rememberMe"
                              color="default"
                              size="small"
                            />
                          }
                          label="Remember me"
                          sx={{ marginRight: "auto" }}
                        />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            fontSize: "12px",
                            color: "blue",
                            textDecoration: "none",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                          component={Link}
                          to="/reset" // Link to the reset password page
                        >
                          Forgot password?
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          transform: {
                            xs: "scale(0.7)",
                            sm: "scale(0.9)",
                            md: "scale(1)",
                          },
                          transformOrigin: "0 0",
                        }}
                      >
                        <ReCAPTCHA
                          sitekey="6Lc5QQUqAAAAAHwue6A6EzBdx3OnMHgeQ0TDLZT8"
                          onChange={onCaptchaChange}
                          className="my-3"
                        />
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{
                        marginBottom: "25px",
                        backgroundColor: "#72acfb",
                        boxShadow: "0 2px 6px #acb5f6",
                      }}
                      type="submit"
                    >
                      Login
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          fontSize: "14px",
                          textTransform: "none",
                          backgroundColor: "#6777ef",
                          boxShadow: "0 2px 6px #acb5f6",
                        }}
                      >
                        Admin Login
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          fontSize: "14px",
                          textTransform: "none",
                          backgroundColor: "#47c363",
                          boxShadow: "0 2px 6px #81d694",
                        }}
                      >
                        User Login
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          fontSize: "14px",
                          textTransform: "none",
                          backgroundColor: "#3abaf4",
                          boxShadow: "0 2px 6px #82d3f8",
                        }}
                      >
                        Client Login
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
