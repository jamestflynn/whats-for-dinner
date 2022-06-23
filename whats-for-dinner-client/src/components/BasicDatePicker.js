import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
    console.log('setOpen')
  }
  const handleChange = (value) => {
    console.log('setChange' + value + ' recipe_id: ' + props.recipe_id)
  }
  const handleClose = () => setOpen(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label="Dinner date"
        value={value}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={(newValue) => {
          setValue(newValue)
          handleChange(newValue)
        }}
        renderInput={(params) => <IconButton onClick={handleOpen}><AddIcon fontSize="large" /></IconButton>}
      />
    </LocalizationProvider>
  );
}