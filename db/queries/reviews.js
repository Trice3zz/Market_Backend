import client from "../client.js";

export async function createReview({ rating, comment, product_id }) {
    const sql = `
      INSERT INTO reviews (rating, comment, product_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await client.query(sql, [rating, comment, product_id])
    return rows[0]
  };

  export async function getReviewsByProductId(product_id) {
    const sql = `
      SELECT * FROM reviews
      WHERE product_id = $1;
    `;
    const { rows } = await client.query(sql, [product_id]);
    return rows[0]
  };