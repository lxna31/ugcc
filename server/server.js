const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
require('./config/db');


app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('UGCC backend is running ✅');
});


app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
