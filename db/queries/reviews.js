import client from "../client.js";

export async function createReview(rating, comment, product_id) {
    const sql = await client.query(`INSERT INTO reviews (rating, comment, product_id) VALUES ($1, $2, $3)
    RETURNING *;`, [rating, comment, product_id])

    return sql.rows[0]
}