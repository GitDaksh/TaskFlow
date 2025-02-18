import React, { useState } from 'react';
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
    <div className="min-h-screen w-screen bg-gray-50">
      <header className="w-full bg-gradient-to-r from-purple-600 to-purple-800 p-6 shadow-lg">
        <div className="max-w-[2000px] w-full mx-auto">
          <h1 className="text-white text-4xl font-light tracking-wide">Task Manager</h1>
        </div>
      </header>

      <main className="max-w-[2000px] w-full mx-auto p-6">
        <div className="flex w-full gap-6">
          <div className="w-[300px] flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-medium mb-4 text-gray-800">Filters</h2>
              <div className="space-y-2">
                <button
                  className={`w-full p-2.5 rounded-lg transition-all duration-200 font-medium ${
                    filter === 'all' 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilter('all')}
                >
                  All Tasks
                </button>
                <button
                  className={`w-full p-2.5 rounded-lg transition-all duration-200 font-medium ${
                    filter === 'completed' 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
                <button
                  className={`w-full p-2.5 rounded-lg transition-all duration-200 font-medium ${
                    filter === 'incomplete' 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilter('incomplete')}
                >
                  Incomplete
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h2 className="text-xl font-medium mb-4 text-gray-800">Statistics</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-600">Total Tasks</span>
                    <span className="text-gray-900 font-semibold">{tasks.length}</span>
                  </div>
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                    <span className="text-gray-600">Completed</span>
                    <span className="text-green-600 font-semibold">
                      {tasks.filter(t => t.completed).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-orange-50 p-3 rounded-lg">
                    <span className="text-gray-600">Pending</span>
                    <span className="text-orange-600 font-semibold">
                      {tasks.filter(t => !t.completed).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-xl font-medium mb-6 text-gray-800">Add New Task</h2>
              <TaskForm addTask={addTask} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-800">Tasks</h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <div className="flex gap-2">
                    {[
                      { key: 'createdAt', label: 'Created' },
                      { key: 'dueDate', label: 'Due Date' },
                      { key: 'priority', label: 'Priority' },
                      { key: 'name', label: 'Name' }
                    ].map((sortOption) => (
                      <button
                        key={sortOption.key}
                        onClick={() => handleSortChange(sortOption.key)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                          ${sortBy === sortOption.key
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        <div className="flex items-center gap-1">
                          {sortOption.label}
                          {sortBy === sortOption.key && (
                            <span className="text-xs">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                  <p className="text-gray-500 text-lg">No tasks to show</p>
                  <p className="text-gray-400 text-sm mt-1">Add a new task to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
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