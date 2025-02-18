import React, { useState } from 'react';

const TaskItem = ({ task, onDelete, onComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const [newDescription, setNewDescription] = useState(task.description);

  const priorityColors = {
    low: 'bg-green-50 text-green-600 border-green-200',
    medium: 'bg-orange-50 text-orange-600 border-orange-200',
    high: 'bg-red-50 text-red-600 border-red-200'
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(task.id, newName, newDescription);
    setIsEditing(false);
  };

  return (
    <div className={`group bg-white border border-gray-100 rounded-xl p-4 
                    transition-all duration-200 hover:shadow-md
                    ${task.completed ? 'bg-gray-50' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 
                       focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-purple-500 
                       focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none"
            rows="2"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                         transition-all duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 
                         transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-4">
          <div 
            className="relative w-5 h-5 flex-shrink-0"
            onClick={() => onComplete(task.id)}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {}}
              className="peer absolute w-full h-full opacity-0 cursor-pointer"
            />
            <div className={`w-full h-full rounded-lg border-2 border-gray-300 
                           transition-all duration-200
                           peer-checked:bg-purple-600 peer-checked:border-purple-600
                           peer-hover:border-purple-500`}>
              {task.completed && (
                <svg 
                  className="w-full h-full text-white p-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-gray-900 truncate
                           ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.name}
            </h3>
            <p className={`text-sm text-gray-500 mt-1
                          ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
            <div className="flex items-center gap-3 mt-2">
              {task.dueDate && (
                <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-md ${priorityColors[task.priority]} border`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg
                         transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg
                         transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;