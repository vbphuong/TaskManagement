export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}

export const fetchTasks = async (token: string): Promise<Task[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
};

export const createTask = async (task: Task, token: string): Promise<Task> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
};