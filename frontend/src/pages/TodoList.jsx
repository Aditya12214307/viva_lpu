import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTodos(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await API.post("/tasks", { title: newTask });
      setTodos([...todos, res.data]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditingText(title);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditSubmit = async (id) => {
    if (!editingText.trim()) return;
    try {
      const res = await API.put(`/tasks/${id}`, { title: editingText });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">My Todos</h2>
        <form onSubmit={handleAdd} className="mb-6 flex gap-2">
          <input
            className="flex-1 p-2 border rounded"
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Add
          </button>
        </form>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo._id} className="p-3 bg-gray-200 rounded flex items-center justify-between">
              {editingId === todo._id ? (
                <>
                  <input
                    className="flex-1 p-1 border rounded mr-2"
                    value={editingText}
                    onChange={handleEditChange}
                    onKeyDown={e => {
                      if (e.key === "Enter") handleEditSubmit(todo._id);
                    }}
                  />
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditSubmit(todo._id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                    onClick={() => { setEditingId(null); setEditingText(""); }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.title}</span>
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(todo._id, todo.title)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
