import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";



function ClickHerePokemon() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/pokemon");
      };
  return (
    <Button size="small" onClick={handleClick}>
        Click here
    </Button>
  );
}

export default ClickHerePokemon;