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


export default router;