import client from "../client.js";

export async function createProduct(title, description, image, price) {
    const sql = await client.query(`INSERT INTO products (title, description, image, price) VALUES ($1, $2, $3, $4)
    RETURNING *;`, [title, description, image, price])

    return sql.rows[0]
}

export async function getProducts(){
    const sql = `
    SELECT * FROM products;
    `
    const {rows: products} = await client.query(sql)
    return products;
};

export async function getProduct(id){
    const sql = `
    SELECT * FROM products WHERE id = $1;
    `
    const {rows: product} = await client.query(sql, [id])
    return product[0];
};
