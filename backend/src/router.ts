import { Router, Request, Response } from 'express';

const router = Router();
const tasks: any = {};
let taskId = 0;

// Create a new task
router.post('/', (req: Request, res: Response) => {
  const { type, params } = req.body;
  const id = ++taskId;
  tasks[id] = { id, type, params, status: 'queued', progress: 0, logs: [] };
  res.json({ id });
});

// Get all tasks
router.get('/', (req: Request, res: Response) => {
  res.json(Object.values(tasks));
});

router.post('/:id', (req, res) => {
    const task = tasks[req.params.id];
    if (!task) return res.status(404).json({ error: 'Task not found' });
  
    const { status, progress, logs } = req.body;
    task.status = status || task.status;
    task.progress = progress || task.progress;
    task.logs = [...task.logs, ...(logs || [])];
  
    res.json(task);
  });

export default router;