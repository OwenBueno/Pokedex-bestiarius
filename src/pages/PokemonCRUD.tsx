import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, ListItem, ListItemText, Card, CardActions, CardContent } from '@mui/material';


import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const API_URL = 'http://localhost:3001/api/pokemons';

interface Pokemon {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
}

function PokemonCRUD() {
  
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [newPokemon, setNewPokemon] = useState({ name: '', type: '' });
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);
  const [nameError, setNameError] = useState<string>('');

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

  const validateInputs = (): boolean => {
    let isValid = true;


    if (newPokemon.name.length < 3) {
      setNameError('Name must be at least 3 characters');
      isValid = false;
    } else {
      setNameError('');
    }
    return isValid;
  };


  const handleAddPokemon = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.post(API_URL, newPokemon);
        if(response){
          setNewPokemon({ name: '', type: '' });
          fetchData();
        }
      } catch (error) {
        console.error('Error adding pokemon:', error);
      }
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
    if (validateInputs() && editingPokemon) {
      try {
        const response = await axios.put(`${API_URL}/${editingPokemon._id}`, newPokemon);
        if(response){
          setEditingPokemon(null);
          setNewPokemon({ name: '', type: '' });
          fetchData();
        }
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
        <h1 style={{textAlign: 'center'}}>Pokemon CRUD</h1>
        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '2rem'}}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <TextField
              sx={{margin: '5px', maxWidth: '10rem'}}
              label="Name"
              variant="outlined"
              value={newPokemon.name}
              onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })}
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              sx={{margin: '5px', maxWidth: '10rem'}}
              label="Type"
              variant="outlined"
              value={newPokemon.type}
              onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value })}
            />
          </Box>
          {editingPokemon ? (
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button sx={{margin: '5px'}} onClick={handleUpdatePokemon} variant="contained" color="primary">
                  Update
                </Button>
                <Button sx={{margin: '5px'}} onClick={handleCancelEdit} variant="contained" color="warning">
                  Cancel
                </Button>
              </Box>
            ) : (
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button sx={{margin: '5px'}} onClick={editingPokemon ? handleUpdatePokemon : handleAddPokemon} variant="contained" color="primary">
                  {editingPokemon ? 'Update Pokemon' : 'Add Pokemon'}
                </Button>
              </Box>
              )}
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(178px, 1fr))', // 6 columns with a minimum width of 150px
            gap: '16px', // Adjust the gap between items as needed
            width: '100%',
            maxHeight: '65vh',
            overflowY: 'auto',
          }}
        >
          {pokemons && Array.isArray(pokemons) && pokemons.map((pokemon) => (
            <ListItem key={pokemon._id}>
              {editingPokemon === pokemon ? (
                <Card sx={{display:"flex", flexDirection: 'column', justifyContent:'center', padding: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                  <img src={pokemon.imageUrl || '/pokemon/missing.jpeg'} alt="" />
                  <CardContent>
                      <ListItemText
                          sx={{ textTransform: 'capitalize' }}
                          primary={`${pokemon.name}`}
                        />
                        <ListItemText
                          sx={{ textTransform: 'capitalize' }}
                          primary={` - ${pokemon.type}`}
                        />
                    </CardContent>
                  <CardActions>
                    <Button onClick={handleUpdatePokemon} variant="contained" color="primary">
                      Update
                    </Button>
                    <Button onClick={handleCancelEdit} variant="contained" color="warning">
                      Cancel
                    </Button>
                  </CardActions>
                  
                </Card>
              ) : (
                  <Card sx={{display:"flex", flexDirection: 'column', justifyContent:'center', backgroundColor: '#f8f8ff '}}>
                    <img src={pokemon.imageUrl || '/pokemon/missing.jpeg'} alt="" />
                    <CardContent>
                      <ListItemText
                          sx={{ textTransform: 'capitalize' }}
                          primary={`Name: ${pokemon.name}`}
                        />
                        <ListItemText
                          sx={{ textTransform: 'capitalize' }}
                          primary={`Type: ${pokemon.type}`}
                        />
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => handleEditPokemon(pokemon)} variant="contained" color="primary">
                        Edit
                      </Button>
                      <Button onClick={() => handleDeletePokemon(pokemon._id)} variant="contained" color="error">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
              )}
            </ListItem>
          ))}
        </Box>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default PokemonCRUD;
