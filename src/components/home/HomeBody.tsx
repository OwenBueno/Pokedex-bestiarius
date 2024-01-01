import React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from '@mui/material/CardMedia';

import ClickHerePokemon from "./button/ClickHerePokemon";

function HomeBody() {
  return (
    <Box sx={{display: "flex",justifyContent: "space-evenly",alignItems: "center", width: "100vw", height:"75vh"}}>

      <Card sx={{ maxWidth: 400}}>
        <CardMedia sx={{ height: 200 }} image="/home/pokemon.png"></CardMedia>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            </Typography>
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "center"}}>
          <ClickHerePokemon></ClickHerePokemon>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            </Typography>
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "center"}}>
             <Button size="small">Click here</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            </Typography>
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "center"}}>
            <Button size="small">Click here</Button>
        </CardActions>
      </Card>

    </Box>
  );
}

export default HomeBody;