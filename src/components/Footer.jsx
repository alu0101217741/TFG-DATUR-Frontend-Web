import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 25,
        minHeight: "40vh",
        backgroundColor: "#003459",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 4, mb: 2 }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Typography
              variant="h4"
              color="common.white"
              align="center"
              gutterBottom
            >
              Turismo
            </Typography>
            <Typography color="common.white" paragraph={true} align="justify">
              Esta web realiza el procesamiento y la visualización de datos
              proporcionados por repositorios Open Data acerca del sector
              turístico en Canarias. La recogida de estos datos es actualizada
              semanalmente.
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <p>
              Sticky footer Sticky footer Sticky footer Sticky footer Sticky
              footer
            </p>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography color="common.white">
              Sticky footer Sticky footer Sticky footer Sticky footer Sticky
              footer
            </Typography>
            <p>
              Sticky footer Sticky footer Sticky footer Sticky footer Sticky
              footer
            </p>
          </Grid>
        </Grid>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
