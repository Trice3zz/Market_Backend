import client from "../client.js";

export async function createReview(rating, comment, userId, product_id) {
    const sql = await client.query(`INSERT INTO reviews (rating, comment, user_id, product_id) VALUES ($1, $2, $3, $4)
    RETURNING *;`, [rating, comment, userId, product_id])

    return sql.rows[0]
}

export async function getReviewsByProductId(productId) {
    const sql = await client.query(`SELECT * FROM reviews WHERE product_id = $1`,
      [productId])
  
    return sql.rows; 
  }