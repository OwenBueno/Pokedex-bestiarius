import React from "react";
import { Container, Typography, Link } from "@mui/material";

function Footer() {
    return (
    <footer style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#f8f8f8" }}>
      <Container maxWidth="lg" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Pokemon Bestiary
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Made with ❤️ by <Link href="https://github.com/OwenBueno">OwenBueno</Link>
        </Typography>
      </Container>
    </footer>
    );
  }
  
  export default Footer;