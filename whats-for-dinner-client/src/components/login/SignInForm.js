import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
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

const SignInForm = () => {
  let navigate = useNavigate();
  const [ signInUser, { data, loading, error }] = useMutation(SIGN_IN_USER_QUERY)
  const [showError, setShowError] = useState(false)
  const email_value = useRef('')
  const password_value = useRef('')
  const handleSubmit = (event) => {
    event.preventDefault();
    signInUser({
      variables:
      {
        email: email_value.current.value,
        password: password_value.current.value,
      }
    }).then((data) => {
      console.log(data.data.signinUser)
      localStorage.setItem('isLoggedIn', true)
      navigate('/')
  }).catch(error => {setShowError(true)})
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowError(false);
  }

  if (data) { console.log(data) }

  if (error) console.log(error)

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
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          defaultValue="jill@doe.com"
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
          defaultValue="letmein"
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
          Sign In
        </Button>
      </Box>
      <Grid>
        <Grid item>
          <Link to="/sign-up" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SignInForm