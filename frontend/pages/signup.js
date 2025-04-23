import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/signup', { username, password });
      router.push('/login');
    } catch (err) {
      setError(err.response?.data || 'Error signing up');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--off-white)] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg bg-white w-full max-w-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sky-blue)] focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sky-blue)] focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--peach)] text-white p-3 rounded-lg hover:bg-[var(--peach)]/90 hover:scale-105 glow"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--sky-blue)] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}