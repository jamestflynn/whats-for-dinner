import React from "react"
import RecipesListing from '../components/recipes/RecipesListing'
import MealPlanListing from '../components/recipes/MealPlanListing'

// MUI Imports
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const Home = () => {
  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          If you are like me you commonly get asked the question "What's for Dinner"?
          Busy lives lead to not planning for meals properly and this app is an attempt
          to make that process a little easier.
        </Typography>
        <Stack
          sx={{ pt: 1 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained">View Meal Plan</Button>
          <Button variant="outlined">Create Meal Plan</Button>
        </Stack>
        <MealPlanListing />
        <RecipesListing />
      </Container>
    </div>
  )
}

export default Home