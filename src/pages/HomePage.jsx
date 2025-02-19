import React, { useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, name, description) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name, description } : task
      )
    );
  };

  const getSortedTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return sortOrder === 'asc' 
            ? new Date(a.dueDate) - new Date(b.dueDate)
            : new Date(b.dueDate) - new Date(a.dueDate);

        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return sortOrder === 'asc'
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority];

        case 'name':
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);

        case 'createdAt':
          return sortOrder === 'asc'
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);

        default:
          return 0;
      }
    });
  };

  const filteredTasks = getSortedTasks(
    tasks.filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    })
  );

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <header className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-[2000px] w-full mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold tracking-tight flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            Task Manager Pro
          </h1>
          <div className="flex items-center gap-4">
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-10 h-10 ring-2 ring-white/20 hover:ring-white/40 transition-all'
                }
              }}
              afterSignOutUrl="/"
            />
          </div>
        </div>
      </header>

      <main className="max-w-[2000px] w-full mx-auto p-6">
        <div className="flex w-full gap-6 flex-col lg:flex-row">
          {/* Sidebar Section */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4 text-purple-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                Filters
              </h2>
              <div className="space-y-2">
                {['all', 'completed', 'incomplete'].map((f) => (
                  <button
                    key={f}
                    className={`w-full p-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2
                      ${filter === f 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'bg-white text-gray-600 hover:bg-purple-50 border border-purple-100'}
                    `}
                    onClick={() => setFilter(f)}
                  >
                    <span className="capitalize">{f}</span>
                    {filter === f && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {/* Statistics Section */}
              <div className="mt-8 pt-6 border-t border-purple-100/50">
                <h2 className="text-lg font-semibold mb-4 text-purple-900 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  Statistics
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Total Tasks', value: tasks.length, color: 'bg-purple-100 text-purple-800' },
                    { label: 'Completed', value: tasks.filter(t => t.completed).length, color: 'bg-green-100 text-green-800' },
                    { label: 'Pending', value: tasks.filter(t => !t.completed).length, color: 'bg-amber-100 text-amber-800' }
                  ].map((stat, idx) => (
                    <div key={idx} className={`${stat.color} p-3 rounded-xl flex items-center justify-between`}>
                      <span className="text-sm font-medium">{stat.label}</span>
                      <span className="font-bold text-lg">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex-1 space-y-6">
            {/* Add Task Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4 text-purple-900">Add New Task</h2>
              <TaskForm addTask={addTask} />
            </div>

            {/* Tasks Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-lg font-semibold text-purple-900">Your Tasks</h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 hidden sm:block">Sort by:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'createdAt', label: 'Created', icon: '🕒' },
                      { key: 'dueDate', label: 'Due Date', icon: '📅' },
                      { key: 'priority', label: 'Priority', icon: '⚠️' },
                      { key: 'name', label: 'Name', icon: '🔤' }
                    ].map((sortOption) => (
                      <button
                        key={sortOption.key}
                        onClick={() => handleSortChange(sortOption.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                          ${sortBy === sortOption.key
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-purple-50 text-gray-600 hover:bg-purple-100'
                          }`}
                      >
                        <span>{sortOption.icon}</span>
                        {sortOption.label}
                        {sortBy === sortOption.key && (
                          <span className="text-xs ml-1">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tasks List */}
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-24 h-24 bg-purple-50 rounded-2xl mx-auto flex items-center justify-center">
                    <span className="text-4xl">📭</span>
                  </div>
                  <p className="text-gray-600 font-medium">No tasks found</p>
                  <p className="text-gray-400 text-sm">Start by adding your first task above</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={deleteTask}
                      onComplete={toggleComplete}
                      onEdit={editTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;