import dbConnect from "../../config/db";
import Task from "../../models/task";

export default async function handler(req, res) {

    const { method } = req;
    const { idTask } = req.query;

    await dbConnect();

    switch (method) {
        case "DELETE":
            await Task.findByIdAndDelete(idTask);
            res.json({ message: "Task deleted successfully" });
            break;
        case "PUT":
            await Task.findByIdAndUpdate(idTask, req.body, {
                new: true,
                runValidators: true,
                });
            res.json({ message: "Task updated successfully" });
            break;
        default:
            res.status(405).end();
    }
}
