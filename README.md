# Task Manager Pro

Task Manager Pro is a feature-rich, visually appealing task management application built with **React** and **Tailwind CSS**. It allows users to add, edit, delete, filter, and sort tasks with an intuitive UI.

## 🚀 Features

✅ **Add Tasks** – Users can create tasks with a name, description, due date, and priority.

✅ **Mark as Complete** – Tasks can be marked as complete or incomplete with a single click.

✅ **Edit Tasks** – Users can modify task names and descriptions.

✅ **Delete Tasks** – Remove tasks permanently from the list.

✅ **Filters & Sorting** – Filter tasks by completion status and sort them by name, priority, due date, or creation time.

✅ **User Authentication** – Uses Clerk for authentication, allowing users to sign in and manage personal tasks.

✅ **Modern UI** – Styled with Tailwind CSS for a clean and responsive design.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Authentication:** Clerk

---

## 📌 Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/gitDaksh/TaskFlow.git
   cd TaskFlow
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm start
   ```
4. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 🏗️ Project Structure

```
📂 src
 ├── 📂 components
 │   ├── TaskForm.js   # Form for adding tasks
 │   ├── TaskItem.js   # Individual task component
 │
 ├── 📂 pages
 │   ├── HomePage.js   # Main task management interface
 │
 ├── App.js            # Root component
 ├── index.js          # Entry point
```

---

## 📌 Usage Guide

1. **Sign In** using the user button at the top.
2. **Add a Task** using the form.
3. **Mark Tasks as Complete** by clicking the checkbox.
4. **Edit or Delete Tasks** using the respective buttons.
5. **Filter Tasks** (All, Completed, Incomplete).
6. **Sort Tasks** by priority, name, due date, or creation time.

---

## 📝 Future Enhancements

🔹 Persistent storage (saving tasks in a database).  
🔹 Drag-and-drop task reordering.  
🔹 Dark mode support.  
🔹 Recurring tasks & reminders.

---

## 🤝 Contributing
Pull requests are welcome! Feel free to fork and enhance the project.

---

## 📜 License
This project is open-source and available under the MIT License.

