import cors from 'cors';
import express from 'express';
import './docker';

import AdminRouter from './routes/admin-router';

const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configure routes
app.use('/api/admin', AdminRouter);

export default app;
