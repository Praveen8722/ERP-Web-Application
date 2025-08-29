
import React, { useState,useContext } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import AdminContext from "../context/AdminContext";
const  Extraleave = ({ open, onClose, levels, leaveCategoryId }) => {
    const { addExtraleave } = useContext(AdminContext);
  const [days, setDays] = useState(levels.map(() => ''));

  const handleInputChange = (index, value) => {
    const newDays = [...days];
    newDays[index] = value;
    setDays(newDays);
  };

  const handleSubmit = async () => {
    try {
      const data = levels.map((level, index) => ({
        levelId: level._id,
        days: days[index],
      }));
      await addExtraleave(leaveCategoryId,data);
      onClose();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}
      style={{marginTop:"10rem"}}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '80vh',
          overflowY: 'auto' 
        }}
      >
        <Typography variant="h6" component="h2">
          Add Policy
        </Typography>
        {levels.map((level, index) => (
          <Box key={level._id} sx={{ mt: 2 }}>
            <Typography>{` ${level.levelName}`}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              label={`Days for ${level.levelName}`}
              value={days[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              sx={{ mt: 1 }}
            />
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};






export default Extraleave;
