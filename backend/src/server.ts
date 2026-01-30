import app from "./app";
import  dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT || 5000;

// 2. Start the server
const startServer = async () => {
  try {
    // You can add your Prisma connection check here later
    app.listen(PORT, () => {
      console.log(`
      🚀 Server is running!
      📡 Port: ${PORT}
      🔗 URL: http://localhost:${PORT}
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();