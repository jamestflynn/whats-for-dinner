import React from 'react'
import { useQuery, gql } from "@apollo/client";
import BasicDatePicker from '../BasicDatePicker'

// MUI Imports
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const RECIPES_QUERY = gql`
  {
    recipes {
      id
      name
      description
      image
    }
  }
`;

const RecipesListing = () => {
  const { data, loading, error } = useQuery(RECIPES_QUERY);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    console.log(data)
    return (
      <Container sx={{ py: 3 }} maxWidth="md">
        <Typography variant="h6" align="left" color="text.secondary" paragraph>
          Recipes
        </Typography>
        <Grid container spacing={4}>
          {data.recipes.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={item.image}
                    alt={item.name}
                  />
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
                    <Grid container>
                      <Grid container item xs={6} justify="left">
                        <Fab size="medium" color="primary">
                          <FavoriteBorderIcon />
                        </Fab>
                      </Grid>
                      <Grid container item xs={6} justifyContent="right">
                        <Fab size="medium" color="primary">
                          <BasicDatePicker recipe_id={item.id} />
                        </Fab>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography>
                    {item.description}
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

export default RecipesListing