import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import NewTask from "../components/newTask";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const {DEV_URL, PROD_URL} = process.env;

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {

    const res = await axios.get(
      "https://nextjs-tasks-app.vercel.app/api/tasks"
    );
    setTasks(
      res.data.map((task) => ({
        ...task,
        showForm: false,
        backgroundColor: task.completed ? "#3A3A3A" : "grey",
        errorMessage: "",
      }))
    );
  };

  const deleteTask = async (idTask) => {
    const { data } = await axios.delete(`${DEV_URL || PROD_URL}/api/${idTask}`);
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

    try {
      const { data } = await axios.put(`${DEV_URL || PROD_URL}/api/${idTask}`, {
        title,
        content,
      });
      setTasks(
        tasks.map((task) => {
          if (task._id === idTask) {
            return {
              ...task,
              title,
              content,
              showForm: false,
              errorMessage: "",
            };
          } else {
            return task;
          }
        })
      );
      console.log(data.message);
    } catch (error) {
      console.error(error);
      setTasks(
        tasks.map((task) => {
          if (task._id === idTask) {
            return { ...task, errorMessage: error.response.data.errorMessage };
          } else {
            return task;
          }
        })
      );
    }
  };

  const toggleCompleted = async (idTask) => {
    const taskToUpdate = tasks.find((task) => task._id === idTask);
    if (!taskToUpdate) {
      console.log(`Task with ID ${idTask} not found`);
      return;
    }
    await axios.put(`${DEV_URL || PROD_URL}/api/${idTask}`, {
      completed: !taskToUpdate.completed,
    });
    setTasks(
      tasks.map((task) => {
        if (task._id === idTask) {
          return { ...task, completed: !taskToUpdate.completed };
        } else {
          return task;
        }
      })
    );
    getTasks();
  };

  return (
    <div className="bg-zinc-950 p-4">
      <Head>
        <title>Todo NextJs App</title>
      </Head>
      <button
        className="bg-gray-700 text-white py-2 px-4 rounded-md mb-4"
        onClick={() => router.back()}
      >
        Go back
      </button>
      <NewTask onTaskCreated={getTasks} />
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold mb-4 m-4 text-white">All Tasks</h1>
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-4 mb-4 rounded-md">
            {task.showForm === false ? (
              <div
                className="p-6 rounded-md"
                style={{ backgroundColor: task.backgroundColor }}
              >
                <input
                  type="checkbox"
                  name="completed"
                  id="completed"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task._id)}
                  className="mr-2"
                />
                <h3 className="text-lg font-bold">{task.title}</h3>
                <h5 className="text-white mb-2">{task.content}</h5>
                <p className="text-white">
                  Task created on:{" "}
                  {new Date(task.createdAt).toLocaleString().split(",")[0]}
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => updateTask(e, task._id)}>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={task.title}
                  className="block w-full mb-2 rounded-md border-gray-400 border py-2 px-3"
                />
                <input
                  type="text"
                  name="content"
                  id="content"
                  defaultValue={task.content}
                  className="block w-full mb-2 rounded-md border-gray-400 border py-2 px-3"
                />
                <input
                  type="submit"
                  value="Update"
                  className="bg-gray-700 text-white py-2 px-4 rounded-md"
                />
                {task.errorMessage && (
                  <p className="text-red-500 mt-3">{task.errorMessage}</p>
                )}
              </form>
            )}
            {task.showForm === true ? (
              <button
                onClick={() => toggleShowForm(task._id)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md mt-2"
              >
                Cancel
              </button>
            ) : (
              <div className="mt-4">
                <button
                  onClick={() => toggleShowForm(task._id)}
                  className="bg-gray-400 text-white py-2 px-4 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-gray-700 text-white py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
