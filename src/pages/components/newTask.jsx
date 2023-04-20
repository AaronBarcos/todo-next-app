import { useState, useEffect } from "react";
import axios from "axios";

const NewTask = ( {onTaskCreated} ) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Aquí puedes hacer una llamada API para obtener todos los posts existentes
    // y actualizar el estado de los posts
    const allTasks = []; // Aquí reemplaza con los posts obtenidos de la API
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {data} = await axios.post("http://localhost:3000/api/tasks", {
      title,
      content,
    });

    onTaskCreated()
    setTitle("");
    setContent("");
    setLoading(false);
  };

  return (
    <div>
      <h3>Create a new task</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default NewTask;