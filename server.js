import app from './app.js';
import client from './db/client.js';
import authRoutes from './Authandregister/auth.js';
app.use('/auth', authRoutes);


const PORT = process.env.PORT ?? 3000;

await client.connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});