import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getTasks = async () => {
      const res = await axios.get("http://localhost:3000/api/tasks");
      setTasks(res.data.map((task) => ({ ...task, showForm: false })));
    };
    getTasks();
  }, []);

  const deleteTask = async (idTask) => {
    const { data } = await axios.delete(`http://localhost:3000/api/${idTask}`);
    setTasks(tasks.filter((task) => task._id !== idTask));
    console.log(data.message);
  };

  const toggleShowForm = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task._id === taskId) {
          return { ...task, showForm: !task.showForm };
        } else {
          return task;
        }
      })
    );
  };


  const updateTask = async (e, idTask) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const { data } = await axios.put(`http://localhost:3000/api/${idTask}`, {
      title,
      content,
    });
    setTasks(
      tasks.map((task) => {
        if (task._id === idTask) {
          return { ...task, title, content, showForm: false };
        } else {
          return task;
        }
      })
    );
    console.log(data.message);
  };

  return (
    <div>
      <button onClick={() => router.back()}>Go back</button>
      <h1>All Tasks</h1>
      {tasks.map((task) => (
        <div key={task._id}>
          {task.showForm === false ? (
            <p>
              {task.title}
              <p>{task.content}</p>
            </p>
          ) : (
            <form onSubmit={(e) => updateTask(e, task._id)}>
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={task.title}
              />
              <input
                type="text"
                name="content"
                id="content"
                defaultValue={task.content}
              />
              <input type="submit" value="Update" />
            </form>
          )}
          {task.showForm === true ? (
            <button onClick={() => toggleShowForm(task._id)}>Cancel</button>
          ) : (
            <div>
              <button onClick={() => toggleShowForm(task._id)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tasks;
