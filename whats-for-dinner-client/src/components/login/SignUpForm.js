import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, gql } from "@apollo/client";

// MUI
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

const CREATE_USER_QUERY = gql`
mutation ($email: String!, $name: String!, $password: String!) {
  createUser(
    input: {
      name: $name,
      authProvider:
      {credentials:
        {
          email: $email,
          password: $password,
        }
      }
    }
  ) {
    id
    name
    email
  }
}`;

export default function SignUpForm() {
  let navigate = useNavigate();
  const [ createUser, { data, loading, error }] = useMutation(CREATE_USER_QUERY);
  const [showError, setShowError] = useState(false)
  const email_value = useRef('')
  const name_value = useRef('')
  const password_value = useRef('')
  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({
      variables:
        {
          email: email_value.current.value,
          password: password_value.current.value,
          name: name_value.current.value,
        }
      }).then((data) => {
        console.log(data.data.createUser)
        localStorage.setItem('isLoggedIn', true)
        navigate('/')
    }).catch(error => {setShowError(true)})
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowError(false);
  };

  //if (error) (<Alert severity="error">{error.message}</Alert>)

  if (data) {
    console.log(data)
  }

  if (loading) return <div>Loading...</div>

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {error &&
        <Snackbar open={showError} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
            {error.message}
          </Alert>
        </Snackbar>
      }
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          inputRef={name_value}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          inputRef={email_value}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          inputRef={password_value}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
      <Grid>
        <Grid item xs>
        </Grid>
        <Grid item>
          <Link to="/sign-in" variant="body2">
            {"Already have an account? Sign In"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}