
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Container, Grid } from "@mui/material";

const Reset = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Box
      className="logo-bg"
      sx={{ minHeight: "100vh", pt: 10 }}
    >
      <Container
        maxWidth="sm"
        sx={{
          margin: 'auto',
        }}
      >
        <Card>
          <CardContent sx={{ p: 5, borderTop: "3px solid #6777ef" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ marginBottom: "2rem", color: "#6777ef" }}
            >
              Reset Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    component="label"
                   
                    sx={{ display: "block", marginBottom: "0.5rem" }}
                  >
                    Email{" "}
                    <Typography component="span" sx={{ color: "red" }}>
                      *
                    </Typography>
                  </Typography>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                     placeholder=" Enter Email"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      fontSize: "12px",
                      backgroundColor: "#72acfb",
                      boxShadow: "0 2px 6px #acb5f6",
                    }}
                  >
                    Send Password Reset Link
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Reset;
