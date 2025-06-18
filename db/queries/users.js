import client from "../client.js";

export async function createUser(username, password) {
    const sql = await client.query(`INSERT INTO users (username, password) VALUES ($1, $2)
    RETURNING *;`, [username, password])

    return sql.rows[0]
}