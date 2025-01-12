import app from './app';
import taskRoutes from './router';

app.use('/api/tasks', taskRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend is running on http://localhost:${PORT}`));