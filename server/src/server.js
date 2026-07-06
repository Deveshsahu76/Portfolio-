import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const { default: app } = await import('./app.js');
const { default: connectDB } = await import('./config/db.js');
const analyticsRoutes = require('./routes/analyticsRoutes')

app.use('/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();