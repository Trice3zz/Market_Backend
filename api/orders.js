import express from "express";
import { createOrder, getOrdersByUser, getOrderById} from "../db/queries/orders.js";

//WILL NEED AUTHORIZATION ADDED TO IT


const router = express.Router();

router.route("/").post(async (req, res) => {
    const { date, note } = req.body;
    if (!date) return res.status(400).send({ error: "Missing date" })
    const order = await createOrder({ date, note, user_id: req.user.id})
    res.status(201).send(order);
  });

  router.route("/").get(async (req, res) => {
    const orders = await getOrdersByUser(req.user.id)
    res.send(orders)
  })

  router.route("/:id").get(async (req, res) => {
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