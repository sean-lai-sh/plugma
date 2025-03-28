import app from "./app";

const PORT: number = Number(process.env.PORT) || 8000;

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server Running on ${PORT}`));
app.set('trust proxy', true);
