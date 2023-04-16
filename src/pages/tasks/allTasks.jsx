import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("http://localhost:3000/api/tasks");
      const taskData = await res.json();
      setTasks(taskData);
    };
    getTasks();
  }, []);

  return (
    <div>
    <button onClick={() => router.back()} >
      Go back
    </button>
      <h1>All Tasks</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
