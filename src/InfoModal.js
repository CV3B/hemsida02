import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4,
};

/* Modal för att visa mer information */
export default function InfoModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} color="primary" ><InfoIcon fontSize="large" /></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.textParagraph1}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.textParagraph2}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.textParagraph3}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.textParagraph4}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}