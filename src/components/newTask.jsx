import { useState, useEffect } from "react";
import axios from "axios";

const NewTask = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { DEV_URL, PROD_URL } = process.env;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${DEV_URL || PROD_URL}/api/tasks`, {
        title,
        content,
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.errorMessage);
    }

    onTaskCreated();
    setTitle("");
    setContent("");
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-md">
      <h3 className="text-gray-800 text-lg font-bold mb-4">
        Create a new task
      </h3>
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 font-bold mb-2">
          Title:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label className="block text-gray-700 font-bold mb-2">
          Content:
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        {errorMessage && (
          <p className="text-red-500 text-xs italic pt-3">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default NewTask;
