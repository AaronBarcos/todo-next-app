import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getTasks = async () => {
      const res = await axios.get("http://localhost:3000/api/tasks");
      setTasks(res.data);
    };
    getTasks();
  }, []);

  const deleteTasks = async (idTask) => {
    const { data } = await axios.delete(`http://localhost:3000/api/${idTask}`);
    setTasks(tasks.filter((task) => task._id !== idTask));
    console.log(data.message);
  };

  return (
    <div>
    <button onClick={() => router.back()} >
      Go back
    </button>
      <h1>All Tasks</h1>
      {tasks.map((task) => (
        <div key={task._id}>
          <h2>{task.title}</h2>
          <p>{task.content}</p>
          <button onClick={() => deleteTasks(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
