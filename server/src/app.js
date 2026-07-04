import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import rateLimiter from './middlewares/rateLimiter.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import healthRoutes from './routes/healthRoutes.js';
import recruiterRoutes from './routes/recruiterRoutes.js';
import freelanceRoutes from './routes/freelanceRoutes.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: '20kb' }));
app.use(rateLimiter);

app.use('/api/health', healthRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/freelance', freelanceRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Devesh Portfolio Backend API is running.',
  });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;