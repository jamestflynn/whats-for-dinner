import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, gql } from "@apollo/client";
import { useForm } from 'react-hook-form'
import { importRecipe } from "../../api/recipe"

// MUI
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

const RecipeUrl = () => {
  let navigate = useNavigate();
  const recipe_url_value = useRef('')

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("onSubmit")
    console.log(recipe_url_value.current.value)
    importRecipe(
        {
          recipe_url: recipe_url_value.current.value,
        }
      ).then((data) => {
        console.log(data)
        localStorage.setItem('temp_recipe', JSON.stringify(data))
        console.log(localStorage.getItem('temp_recipe'))
        navigate('/edit-recipe')
    }).catch(error => {setShowError(true)})
  };

  const [showError, setShowError] = useState(false)

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Import Recipe
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="recipe_url"
          label="Recipe URL"
          defaultValue=""
          name="recipe_url"
          autoComplete="recipe_url"
          inputRef={recipe_url_value}
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Import
        </Button>
      </Box>
    </Box>
  )
}

export default RecipeUrl