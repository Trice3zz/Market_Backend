import express from "express";
import { getProducts, getProduct } from "../db/queries/products.js";

//WILL NEED AUTHORIZATION ADDED TO IT

const router = express.Router();

router.route("/").get(async (req, res) => {
  const products = await getProducts()
  res.send(products)
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id
  if (!Number.isInteger(id) && id != 0) 
    return res.status(400).send({ error: "Invalid ID" })
  const product = await getProduct(id)
  if (!product){
    return res.status(404).send({ error: "Product not found" })
  }
  res.send(product)
});

router.route("/:id/reviews").get(async (req, res) => {
  const id = req.params.id
  if (!Number.isInteger(id) && id !=0) 
    return res.status(400).send({ error: "Invalid ID" })
  const product = await getProduct(id)
  if (!product){
    return res.status(404).send({ error: "Product not found" })
  }
    const reviews = await getReviewsByProductId(id)
  res.send(reviews)
});

router.route("/:id/reviews").post(async (req, res) => {
  const id = req.params.id
  if (!Number.isInteger(id)) return res.status(400).send({ error: "Invalid ID" })
  const product = await getProduct(id)
  if (!product) return res.status(404).send({ error: "Product not found" })
  const { rating, comment } = req.body
  if (!rating) return res.status(400).send({ error: "Missing rating" })
  const review = await createReview({ rating, comment, product_id: id })
  res.status(201).send(review)
});

export default router;
