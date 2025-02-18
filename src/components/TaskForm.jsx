import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      addTask({ name, description, dueDate, priority });
      setName('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: 'bg-green-50 text-green-600 border-green-200' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { value: 'high', label: 'High Priority', color: 'bg-red-50 text-red-600 border-red-200' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 
                     focus:ring-2 focus:ring-purple-200 transition-all duration-200
                     placeholder:text-gray-400 text-gray-600"
        />
      </div>

      <div className="space-y-2">
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 
                     focus:ring-2 focus:ring-purple-200 transition-all duration-200
                     placeholder:text-gray-400 text-gray-600 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 
                       focus:ring-2 focus:ring-purple-200 transition-all duration-200
                       text-gray-600"
          />
        </div>

        <div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 
                       focus:ring-2 focus:ring-purple-200 transition-all duration-200
                       text-gray-600 appearance-none bg-white"
          >
            {priorityOptions.map(option => (
              <option 
                key={option.value} 
                value={option.value}
                className={`py-2 ${option.color}`}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-medium
                   transform transition-all duration-200 hover:bg-purple-700
                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                   active:scale-[0.98] hover:shadow-lg hover:-translate-y-0.5"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;