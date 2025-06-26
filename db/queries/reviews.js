import client from "../client.js";

export async function createReview({ rating, comment, product_id, user_id }) {
    const sql = `
      INSERT INTO reviews (rating, comment, product_id, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await client.query(sql, [rating, comment, product_id, user_id])
    return rows[0]
  };

  export async function getReviewsByUserId(user_id) {
    const sql = `
      SELECT r.id, r.rating, r.comment, p.title AS product
      FROM reviews r
      JOIN products p ON r.product_id = p.id
      WHERE r.user_id = $1
      ORDER BY r.id DESC;
    `;
    const { rows } = await client.query(sql, [user_id]);
    return rows;
  }

  export async function getReviewsByProductId(product_id) {
    const sql = `
      SELECT r.id, r.rating, r.comment, u.username AS user
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = $1
      ORDER BY r.id DESC;
    `;
    const { rows } = await client.query(sql, [product_id]);
    return rows;
  };