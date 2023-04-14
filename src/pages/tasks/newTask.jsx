import { useState, useEffect } from "react";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [postsState, setPostsState] = useState([]);

  useEffect(() => {
    // Aquí puedes hacer una llamada API para obtener todos los posts existentes
    // y actualizar el estado de los posts
    const allPosts = []; // Aquí reemplaza con los posts obtenidos de la API
    setPostsState(allPosts);
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

    const newPost = await res.json();

    setPostsState([...postsState, newPost]);
    setTitle("");
    setContent("");
    setLoading(false);
  };

  return (
    <div>
      <h1>Create a new post</h1>
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

export default NewPost;