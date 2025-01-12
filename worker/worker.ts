import axios from 'axios';

const BACKEND_URL = 'http://backend:3000/api/tasks';

async function processTask(task: any) {
  console.log(`Processing task ${task.id} of type ${task.type}`);
  await updateTask(task.id, 'running', 0, ['Task started']);

  for (let i = 1; i <= 5; i++) {
    await new Promise((res) => setTimeout(res, 1000));
    await updateTask(task.id, 'running', i * 20, [`Step ${i} completed`]);
  }

  await updateTask(task.id, 'completed', 100, ['Task completed successfully']);
}

async function updateTask(id: number, status: string, progress: number, logs: string[]) {
  await axios.post(`${BACKEND_URL}/${id}`, { status, progress, logs });
}

async function pollTasks() {
  try {
    const { data: tasks } = await axios.get(BACKEND_URL);
    const queuedTasks = tasks.filter((task: any) => task.status === 'queued');

    for (const task of queuedTasks) {
      await processTask(task);
    }
  } catch (err: any) {
    console.error('Error polling tasks:', err.message);
  }
}

setInterval(pollTasks, 5000);