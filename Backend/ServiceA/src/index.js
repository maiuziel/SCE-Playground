import express from "express";
import cors from "cors";

const app = express();
const PORT = 4001;

app.use(express.json());
app.use(cors());
 
app.post("/ping", async (req, res) => {
  res.status(200).send({
    message: "✅ Ping received from Service A",
    createdId: 123,
    user: "John" // תוכל להחליף בנתון אמיתי בעתיד
  });
});

app.listen(PORT, () => {
  console.log(`service A is running on http://localhost:${PORT}`);
});

