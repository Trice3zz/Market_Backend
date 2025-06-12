import app from "./app.js";
import client from "./db/client.js";

const PORT = process.env.PORT ?? 3000;

await client.connect();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});