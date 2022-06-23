import React from 'react'
import { useQuery, gql } from "@apollo/client";

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

const RECIPES_QUERY = gql`
{
  user {
    id
    mealPlans {
      id
      date
      recipe {
        id
        name
        description
        image
      }
    }
  }
}
`;

const MealPlanListing = () => {
  const DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
  const { data, loading, error } = useQuery(RECIPES_QUERY)

  if (error) {
    return console.error(error.message)
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container sx={{ py: 3 }} maxWidth="md">
        <Typography variant="h6" align="left" color="text.secondary" paragraph>
          Meals Planned
        </Typography>
        <Grid container spacing={4}>
          {data.user.mealPlans.length === 0 &&
            <Typography variant="h6" align="center" width="100%" sx={{ margin_top:'10px'}}>
                    No meals planned yet.
            </Typography>
          }
          {data.user.mealPlans.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={item.recipe.image}
                    alt={item.recipe.name}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      color: 'white',
                      padding: '5px',
                      bgcolor: 'rgba(0, 0, 0, 0.45)'
                    }}
                  >
                    <Typography gutterBottom variant="body">
                      <CalendarMonthIcon fontSize="20px" /> {(new Date(item.date)).toLocaleDateString('en-US', DATE_OPTIONS)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      color: 'red',
                      padding: '10px',
                    }}
                  >
                    <Fab size="medium" color="primary">
                      <FavoriteBorderIcon />
                    </Fab>
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h5">
                    {item.recipe.name}
                  </Typography>
                  <Typography>
                    {item.recipe.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" >View</Button>
                  <Rating name="read-only" size="small" value={4} sx={{ flexGrow: 1, alignItems: "right" }} readOnly />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }
}

export default MealPlanListing