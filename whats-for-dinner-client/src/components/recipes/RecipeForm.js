import React, { useRef, useState } from 'react'
import { useQuery, useMutation, gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";

// MUI Imports
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SIGN_IN_USER_QUERY = gql`
mutation ($email: String!, $password: String!) {
  signinUser(
    input: {
      credentials: {
        email: $email,
        password: $password
      }
    }
  ) {
    id
    name
    email
  }
}`;

const RecipeForm = () => {
  const recipe = JSON.parse(localStorage.getItem('temp_recipe')).recipe
  const [signInUser, { data, loading, error }] = useMutation(SIGN_IN_USER_QUERY)
  const [showError, setShowError] = useState(false)
  console.log(recipe)
  let [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("id")

  if (error) {
    return console.error(error.message)
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container sx={{ py: 3 }} maxWidth="md">
        <Typography variant="h3" component="div" gutterBottom>
          {recipe.name}
        </Typography>

        {recipe.description}

        <img src={recipe.image_url} />

        <p>
          Cook time: {recipe.cook_time},
          Prep time: {recipe.prep_time},
          Total time: {recipe.total_time},
          Servings: {recipe.yield}
        </p>

        <Typography variant="h6" component="div" gutterBottom>
          Ingredients
        </Typography>

        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li> {ingredient}</li>
          ))}
        </ul>

        <Typography variant="h6" component="div" gutterBottom>
          Instructions
        </Typography>

        <ol>
          {recipe.instructions.map((instruction) => (
            <li> {instruction}</li>
          ))}
        </ol>
      </Container>
    )
  }
}

export default RecipeForm