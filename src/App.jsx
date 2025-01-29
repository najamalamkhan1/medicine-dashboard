import { useState, useEffect } from 'react'
import { Container, Typography, Grid } from '@mui/material'
import MedicineForm from './components/MedicineForm'
import MedicineList from './components/MedicineList'
import Analytics from './components/Analytics'
import axios from 'axios'

function App() {
  const [medicines, setMedicines] = useState([])
  const [editMedicine, setEditMedicine] = useState(null)

  useEffect(() => {
    fetchMedicines()
  }, [])

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:3000/medicines')
      setMedicines(response.data)
    } catch (error) {
      console.error('Error fetching medicines:', error)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (editMedicine) {
        await axios.put(
          `http://localhost:3000/medicines/${editMedicine._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      } else {
        await axios.post('http://localhost:3000/medicines', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      fetchMedicines()
      setEditMedicine(null)
    } catch (error) {
      console.error('Error saving medicine:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/medicines/${id}`)
      fetchMedicines()
    } catch (error) {
      console.error('Error deleting medicine:', error)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Medicine Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <MedicineForm
            onSubmit={handleSubmit}
            editMedicine={editMedicine}
            setEditMedicine={setEditMedicine}
          />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Analytics medicines={medicines} />
          <MedicineList
            medicines={medicines}
            onEdit={setEditMedicine}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App