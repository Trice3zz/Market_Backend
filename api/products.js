import express from "express";
import { getProduct, getProductById, getReviewsByProductId } 

const router = express.Router();

router.route("/").get(async (req, res) => {
    const products = await getProducts();
    res.send(products);
});

router.route("/:id").get(async (req, res) => {
    const id = req.params.id
    const product = await getProduct(id)
    if(!product){
        return res.status(404).send({ error: "ID does not exist"})
    }
    res.send(product);
});

router.get("/products/:id/reviews", async (req, res) => {
    const productId = req.params.id;
    const product = await getProductById(productId);
    if (!product) {
        return res.status(404).send({ error: "Product not found" });
    }
    const reviews = await getReviewsByProductId(productId);
    res.send(reviews);
});

export default router;