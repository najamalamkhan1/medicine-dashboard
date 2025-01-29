import { useState, useEffect } from 'react'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'

const MedicineForm = ({ onSubmit, editMedicine, setEditMedicine }) => {
  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    description: '',
    image: null
  })

  useEffect(() => {
    if (editMedicine) {
      setFormData({
        name: editMedicine.name,
        dose: editMedicine.dose,
        description: editMedicine.description,
        image: null
      })
    }
  }, [editMedicine])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', formData.name)
    data.append('dose', formData.dose)
    data.append('description', formData.description)
    if (formData.image) data.append('image', formData.image)
    
    onSubmit(data)
    setFormData({ name: '', dose: '', description: '', image: null })
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {editMedicine ? 'Edit Medicine' : 'Add New Medicine'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Medicine Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        
        <TextField
          fullWidth
          label="Dose"
          name="dose"
          value={formData.dose}
          onChange={handleChange}
          margin="normal"
          required
        />
        
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ margin: '16px 0' }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            {editMedicine ? 'Update' : 'Submit'}
          </Button>
          
          {editMedicine && (
            <Button 
              variant="outlined" 
              onClick={() => setEditMedicine(null)}
            >
              Cancel
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  )
}

export default MedicineForm