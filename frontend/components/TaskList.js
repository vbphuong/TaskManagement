import Link from 'next/link';

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-5 rounded-lg shadow-md bg-[var(--light-peach)] hover:scale-105 fade-in ${
            task.completed ? 'pulse border-l-4 border-[var(--sky-blue)]' : ''
          }`}
        >
          <h3 className="font-semibold text-xl text-gray-800">{task.title}</h3>
          <p className="text-gray-600 mt-2">{task.description || 'No description'}</p>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onUpdateTask(task.id, { ...task, completed: !task.completed })} // Only toggles completed status
              className="w-5 h-5 text-[var(--sky-blue)] border-gray-300 rounded focus:ring-[var(--sky-blue)]"
            />
            <span
              className={`ml-3 font-medium ${
                task.completed ? 'text-[var(--sky-blue)]' : 'text-gray-600'
              }`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <Link href={`/update-task/${task.id}`}>
              <button className="bg-[var(--sky-blue)] text-white px-4 py-2 rounded-lg hover:bg-[var(--sky-blue)]/90 hover:scale-105 glow">
                Update
              </button>
            </Link>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="bg-[var(--peach)] text-white px-4 py-2 rounded-lg hover:bg-[var(--peach)]/90 hover:scale-105 glow"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}