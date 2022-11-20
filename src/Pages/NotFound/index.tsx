import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <img
          src="images/not-found-image.svg"
          alt="logo-sigvet"
          style={{ margin: "auto", maxWidth: "200px" }}
        />
        <h1>Ops! Página não encontrada...</h1>
        <h4>
          <Link to="/">
            <Button variant="outlined">Voltar</Button>
          </Link>
        </h4>
      </div>
    </Container>
  );
}
