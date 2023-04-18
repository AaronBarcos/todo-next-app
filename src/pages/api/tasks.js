import dbConnect from "../../config/db";
import Task from "../../models/task";

export default async function handler(req, res) {

  const { method } = req;

   await dbConnect();

  switch (method) {
    case "POST":
      const newTask = await new Task(req.body).save();
      res.json({ data: newTask, message: "Task created successfully" }); 
      break;
    case "GET":
      const allTasks = await Task.find();
      res.status(200).json(allTasks);
      break;
    default:
      res.status(405).end();
  }
}
