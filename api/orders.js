import express from "express";
import { createOrder, getOrdersByUser, getOrderById} from "../db/queries/orders.js";
import { verifyToken } from "../Middleware/authMiddleware.js";
import client from "../db/client.js";

//WILL NEED AUTHORIZATION ADDED TO IT


const router = express.Router();

router.route("/").post(verifyToken, async (req, res) => {
    const { date, note } = req.body;
    if (!date) return res.status(400).send({ error: "Missing date" })
    const order = await createOrder(date, note, req.user.id)
    res.status(201).send(order);
  });

  router.route("/").get(verifyToken, async (req, res) => {
    const orders = await getOrdersByUser(req.user.id)
    res.send(orders)
  })

  router.route("/:id").get(verifyToken, async (req, res) => {
    const id = req.params.id
    if (!Number.isInteger(id) || id <= 0) return res.status(400).send({ error: "Invalid ID" })
    const order = await getOrderById(id)
    if(!order){
        return res.status(404).send({error: "Order not found"})
    }
    if(order.user_id !== req.user.id){
        return res.status(403).send({error: "Access denied"})
    }
    res.send(order)
  })

  router.route("/:id").delete(verifyToken, async (req, res) => {
    const id = Number(req.params.id)
    const userId = req.user.id
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid order ID" });
    }
    try {
      const order = await getOrderById(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      if (order.user_id !== userId) {
        return res.status(403).json({ error: "You are not authorized to delete this order" });
      }
      await client.query("DELETE FROM orders WHERE id = $1", [id]);
      res.status(204).send()
    }catch(error){
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Failed to delete order" });
    }
  });
  

  export default router;