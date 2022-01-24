import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Main() {
  document.body.style.backgroundColor = "white";
  return (
    <>
      <Container maxWidth="xs" variant="middle">
        <h1>Main Page</h1>
        <ul>
          <li>
            <Link to="/rush-hour-timer">Rush Hour Timer</Link>
          </li>
          {/* <li>Mood Music</li> */}
          <li>
            <Link to={"/random-pepe"}>Random Pepe</Link>
          </li>
          {/* <li>
            <Link to="/micro-dust">Micro Dust</Link>
          </li> */}
          {/* <li>
            <Link to="/bakery-place">Bakery Place</Link>
          </li> */}
        </ul>
      </Container>
    </>
  );
}

export default Main;
