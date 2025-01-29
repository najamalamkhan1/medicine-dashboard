import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const MedicineList = ({ medicines, onEdit, onDelete }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="medicine table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Dose</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine._id}>
                <TableCell>
                  {medicine.image && (
                    <img 
                      src={`http://localhost:3000/uploads/${medicine.image}`}
                      alt={medicine.name}
                      style={{ 
                        width: 50,
                        height: 50,
                        objectFit: 'cover',
                        borderRadius: 4
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.dose}</TableCell>
                <TableCell sx={{ maxWidth: 300 }}>{medicine.description}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => onEdit(medicine)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => onDelete(medicine._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MedicineList;