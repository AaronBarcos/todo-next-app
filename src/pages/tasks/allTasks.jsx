import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NewTask from "../components/newTask";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const res = await axios.get("http://localhost:3000/api/tasks");
    setTasks(res.data.map((task) => ({ ...task, showForm: false })));
  };

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

  const toggleCompleted = async (e, idTask) => {
    const { data } = await axios.put(`http://localhost:3000/api/${idTask}`, {
      completed: !e.target.checked,
    });
    setTasks(
      tasks.map((task) => {
        if (task._id === idTask) {
          return { ...task, completed: !e.target.checked };
        } else {
          return task;
        }
      })
    );
    console.log(data.message);
  };


  return (
    <>
      <button onClick={() => router.back()}>Go back</button>
      <NewTask onTaskCreated={getTasks} />
      <div>
        <h1>All Tasks</h1>
        {tasks.map((task) => (
          <div key={task._id}>
            {task.showForm === false ? (
              <div style={{ backgroundColor: task.backgroundColor }}>
                <input
                  type="checkbox"
                  name="completed"
                  id="completed"
                  checked={task.completed}
                  onChange={(e) => toggleCompleted(e, task._id)}
                />
                <h3>{task.title}</h3>
                <p>{task.content}</p>
              </div>
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
    </>
  );
};

export default Tasks;
