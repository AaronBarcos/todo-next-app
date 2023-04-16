// tasks.js

import clientPromise from "../../config/db";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-todo-app");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let task = await db.collection("tasks").insertOne(bodyObject);
      res.json(task.ops[0]);
      break;
    case "GET":
      const allTasks = await db.collection("tasks").find({}).toArray();
      res.json(allTasks);
      break;
  }
}
