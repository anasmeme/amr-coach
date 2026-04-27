const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("AMR Coach Server is running 🚀");
});

// chat endpoint
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  let reply = "";

  if (userMessage.includes("ابدأ")) {
    reply = "ابدأ بخطوة واحدة فقط: اختر مجالك (مطاعم، صالونات، عقارات)";
  } else if (userMessage.includes("عميل")) {
    reply = "ركز على العميل الجاهز للدفع، مو أي شخص.";
  } else {
    reply = "ركز على الخطوة الحالية فقط، لا تشتت حالك.";
  }

  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
