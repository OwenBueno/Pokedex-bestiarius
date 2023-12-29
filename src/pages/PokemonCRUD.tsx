import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';


import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const API_URL = 'http://localhost:3001/api/pokemons';

interface Pokemon {
  _id: string;
  name: string;
  type: string;
}

function PokemonCRUD() {
  
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [newPokemon, setNewPokemon] = useState({ name: '', type: '' });
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setPokemons(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddPokemon = async () => {
    try {
      await axios.post(API_URL, newPokemon);
      setNewPokemon({ name: '', type: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding pokemon:', error);
    }
  };

  const handleEditPokemon = (pokemon: Pokemon) => {
    setEditingPokemon(pokemon);
    // Populate the input fields with the current values
    setNewPokemon({ name: pokemon.name, type: pokemon.type });
  };

  const handleCancelEdit = () => {
    setEditingPokemon(null);
    setNewPokemon({ name: '', type: '' });
  };

  const handleUpdatePokemon = async () => {
    if (editingPokemon) {
      try {
        await axios.put(`${API_URL}/${editingPokemon._id}`, newPokemon);
        setEditingPokemon(null);
        setNewPokemon({ name: '', type: '' });
        fetchData();
      } catch (error) {
        console.error('Error updating pokemon:', error);
      }
    }
  };

  const handleDeletePokemon = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting pokemon:', error);
    }
  };

  return (
    <div>
      <Header></Header>
      <div>
        <h1>Pokemon CRUD</h1>
        <List>
          {pokemons.map((pokemon) => (
            <ListItem key={pokemon._id}>
              {editingPokemon === pokemon ? (
                <>
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={newPokemon.name}
                    onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })}
                  />
                  <TextField
                    label="Type"
                    variant="outlined"
                    value={newPokemon.type}
                    onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value })}
                  />
                  <Button onClick={handleUpdatePokemon} variant="contained" color="primary">
                    Update
                  </Button>
                  <Button onClick={handleCancelEdit} variant="contained" color="warning">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <ListItemText primary={`${pokemon.name} - ${pokemon.type}`} />
                  <Button onClick={() => handleEditPokemon(pokemon)} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDeletePokemon(pokemon._id)} variant="contained" color="secondary">
                    Delete
                  </Button>
                </>
              )}
            </ListItem>
          ))}
        </List>
        <div>
          <TextField
            label="Name"
            variant="outlined"
            value={newPokemon.name}
            onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })}
          />
          <TextField
            label="Type"
            variant="outlined"
            value={newPokemon.type}
            onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value })}
          />
          <Button onClick={handleAddPokemon} variant="contained" color="primary">
            Add Pokemon
          </Button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default PokemonCRUD;
