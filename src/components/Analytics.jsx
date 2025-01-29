import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const Analytics = ({ medicines }) => {
  // Calculate medicine statistics
  const getDoseDistribution = () => {
    const distribution = {};
    medicines.forEach(medicine => {
      distribution[medicine.dose] = (distribution[medicine.dose] || 0) + 1;
    });
    return Object.entries(distribution).map(([dose, count]) => ({
      dose,
      count
    }));
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Medicine Analytics
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Total Medicines: {medicines.length}
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={getDoseDistribution()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dose" />
          <YAxis />
          <Tooltip />
          <Bar 
            dataKey="count" 
            fill="#1976d2" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default Analytics;