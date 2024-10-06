const userRoutes = require('./routes/userRoutes')
const express = require('express');
const port = process.env.PORT || 3000
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(port,() => {
  console.log(`Server Running on http://localhost:${port}`)
});