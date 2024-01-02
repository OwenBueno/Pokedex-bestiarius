import React from "react";
import { Box, Card, CardActions, CardContent, Button, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    title: "Pokemon CRUD",
    description: "Basic page for creating, reading, updating and deleting Pokémon.",
    image: "/home/pokemon.png",
    route: "/pokemon",
  },
  {
    title: "Pokedex",
    description: "Simple Pokedex with implementation of requests and search.",
    image: "/home/pokedex.png",
    route: "/pokedex",
  },
  {
    title: "Pokedex with pdf Download",
    description: "A simple pokedex interface with the option to download pokemons.",
    image: "/home/pokedexToPdf.png",
    route: "/pokemon/pdf",
  },
];

function HomeBody() {
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(route);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100vw", height: "75vh" }}>
      {cardData.map((card, index) => (
        <Card key={index} sx={{ maxWidth: 400 }}>
          <CardMedia sx={{ height: 200 }} image={card.image}></CardMedia>
          <CardContent>
            <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button size="small" onClick={() => handleClick(card.route)}>Click here</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default HomeBody;
