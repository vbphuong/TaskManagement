import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function UpdateTask() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const { token } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // Fetch the task data
  useEffect(() => {
    if (id && token) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const taskData = response.data;
          setTask(taskData);
          setTitle(taskData.title);
          setDescription(taskData.description || '');
          setCompleted(taskData.completed);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };
      fetchTask();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/${id}`,
        { title, description, completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!task || !token) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[var(--off-white)] flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Update Task</h1>
      <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-lg shadow-lg bg-white w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sky-blue)] focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Task Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sky-blue)] focus:border-transparent"
            rows="3"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="w-5 h-5 text-[var(--sky-blue)] border-gray-300 rounded focus:ring-[var(--sky-blue)]"
          />
          <label htmlFor="completed" className="ml-3 text-gray-700 font-medium">
            Completed
          </label>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[var(--peach)] text-white p-3 rounded-lg hover:bg-[var(--peach)]/90 hover:scale-105 glow"
          >
            Save Changes
          </button>
          <Link href="/">
            <button className="flex-1 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 hover:scale-105 glow">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}