import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskState, setTaskState] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Aquí puedes hacer una llamada API para obtener todos los posts existentes
    // y actualizar el estado de los posts
    const allTasks = []; // Aquí reemplaza con los posts obtenidos de la API
    setTaskState(allTasks);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    const newTask = await res.json();

    setTaskState([...taskState, newTask]);
    setTitle("");
    setContent("");
    setLoading(false);
  };

  return (
    <div>
      <button onClick={() => router.back()} >
        Go back
      </button>
      <h1>Create a new task</h1>
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