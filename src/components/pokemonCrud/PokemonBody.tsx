import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, ListItem } from '@mui/material';

import PokemonCard from './PokemonCard';
import PokemonForm from './PokemonForm';

const API_URL = 'http://localhost:3001/api/pokemons';

interface Pokemon {
    _id: string;
    name: string;
    type: string;
    imageUrl: string;
  }

function PokemonBody() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [newPokemon, setNewPokemon] = useState({ name: '', type: '' });
    const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);
    const [nameError, setNameError] = useState<string>('');
    const [typeError, setTypeError] = useState<string>('');

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
  
    const validateField = (value: string, fieldName: string, minLength: number, maxLength: number) => {
      if (value.trim().length < minLength || value.trim().length > maxLength || !/^[a-zA-Z]+$/.test(value.trim())) {
        if (fieldName === 'name') {
          setNameError(`Name must be between ${minLength} and ${maxLength} characters and contain only letters`);
        } else {
          setTypeError(`Type must not exceed ${maxLength} characters and contain only letters`);
        }
        isValid = false;
      } else {
        if (fieldName === 'name') {
          setNameError('');
        } else {
          setTypeError('');
        }
      }
    };
  
    validateField(newPokemon.name, 'name', 3, 19);
    validateField(newPokemon.type, 'type', 0, 19); // Allow empty value for the type field
  
    return isValid;
  };

  const handleAddPokemon = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.post(API_URL, newPokemon);
        if (response) {
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
        if (response) {
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
    <>
        <h1 style={{ textAlign: 'center' }}>Pokemon CRUD</h1>
        <PokemonForm
        newPokemon={newPokemon}
        nameError={nameError}
        typeError={typeError}
        editingPokemon={editingPokemon}
        setNewPokemon={setNewPokemon}
        handleUpdatePokemon={handleUpdatePokemon}
        handleAddPokemon={handleAddPokemon}
        handleCancelEdit={handleCancelEdit}
        />
        {pokemons.length > 0 ? (
        <Box
        sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(178px, 1fr))',
            gap: '16px',
            width: '100%',
            maxHeight: '65vh',
            overflowY: 'auto',
        }}
        >
        {pokemons.map((pokemon) => (
            <ListItem key={pokemon._id}>
            <PokemonCard
                pokemon={pokemon}
                editingPokemon={editingPokemon}
                handleUpdatePokemon={handleUpdatePokemon}
                handleCancelEdit={handleCancelEdit}
                handleEditPokemon={handleEditPokemon}
                handleDeletePokemon={handleDeletePokemon}
            />
            </ListItem>
        ))}
        </Box>
        ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No pokemons found.</p>
        )}
    </>
    );
}
    export default PokemonBody;