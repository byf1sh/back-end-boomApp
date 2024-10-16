const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const fetchboatRoutes = require('./routes/fetchboatRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const newsRoutes = require('./routes/newsRoutes');
const express = require('express');
const port = process.env.PORT || 3000
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/boat', fetchboatRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/news', newsRoutes);

app.listen(port,() => {
  console.log(`Server Running on http://localhost:${port}`)
});