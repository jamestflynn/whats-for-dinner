import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import routes from "./routes"

// MUI Imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { orange } from '@mui/material/colors';

//MUI theme settings
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    mode: "light",
    primary: orange,
    secondary: {
      main: '#f50057',
    },
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Router>
      <Header />
        <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 10,
              pb: 4,
            }}
          >
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                  exact
                ></Route>
              ))}
            </Routes>
          </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App;
