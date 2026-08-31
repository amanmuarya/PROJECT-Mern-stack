import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:5000/api/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  // Get all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL)
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Add task
  const addTask = async (e) => {
    e.preventDefault()

    if (!title.trim()) return

    try {
      setLoading(true)

      await axios.post(API_URL, {
        title: title.trim(),
        completed: false,
      })

      setTitle('')
      fetchTasks()
    } catch (error) {
      console.error('Error adding task:', error)
    } finally {
      setLoading(false)
    }
  }

  // Update task status
  const toggleTask = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed,
      })

      fetchTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div className="app">
      <div className="todo-container">
        <h1>My Todo App</h1>

        <form onSubmit={addTask} className="todo-form">
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div className="task" key={task._id}>
                <span
                  className={task.completed ? 'completed' : ''}
                  onClick={() => toggleTask(task)}
                >
                  {task.title}
                </span>

                <button onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App