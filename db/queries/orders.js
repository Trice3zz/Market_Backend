import client from "../client.js";

export async function createOrder(date, note, user_id){
    const sql = await client.query(`INSERT INTO orders (date, note, user_id) VALUES ($1, $2, $3)
    RETURNING *;`, [date, note, user_id])

    return sql.rows[0]
};

export async function getOrdersByUser(user_id){
    const sql = `
    SELECT * FROM orders WHERE user_id = $1;
    `
    const {rows: order} = await client.query(sql, [user_id])
    return order;
};

export async function getOrderById(id){
    const sql = `
    SELECT * FROM orders WHERE id = $1;
    `
    const {rows: order} = await client.query(sql, [id])
    return order[0];
};
