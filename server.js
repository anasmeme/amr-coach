const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🧠 AI Coach Logic
app.post("/api/coach", (req, res) => {
try {
const messages = req.body.messages || [];
const last = messages[messages.length - 1]?.content || "";
const text = last.toLowerCase();

```
let reply = "";

// 🎯 حالات ذكية

if (
  text.includes("ابدأ") ||
  text.includes("من اين") ||
  text.includes("كيف ابدأ")
) {
  reply = `خلينا نمشي خطوة خطوة.
```

👉 أول قرار لازم تاخده الآن:
اختار niche واحد فقط (مطاعم - صالونات - متاجر)

لا تفكر كثير.

شو أقرب مجال إلك؟`;
}

```
else if (
  text.includes("مطعم") ||
  text.includes("مطاعم")
) {
  reply = `اختيار قوي 🔥
```

المطاعم سوق سريع وفيه طلب.

👉 الخطوة الجاية:
اعمل 5 بوستات لمطعم وهمي باستخدام AI.

لما تخلص، ابعتلي وأنا أعدّل لك.`;
}

```
else if (
  text.includes("ما رد") ||
  text.includes("مافي رد")
) {
  reply = `تمام — هاي مشكلة طبيعية.
```

🔻 السبب غالباً:

* الرسالة ضعيفة
* أو مو مخصصة

👉 ابعتلي الرسالة اللي أرسلتها
وبظبطها لك مباشرة.`;
}

```
else if (
  text.includes("سعر") ||
  text.includes("تخفيض")
) {
  reply = `لا تعطي تخفيض مباشرة ❌
```

👉 بدلها قول:
"خلينا نبدأ بـ 50$ ونجرب"

هيك بتحافظ على قيمتك.

بدك سكربت جاهز؟`;
}

```
else if (
  text.includes("انستغرام") ||
  text.includes("instagram")
) {
  reply = `اختار حساب فيه:
```

✔ محتوى ضعيف
✔ عنده متابعين
✔ بزنس واضح

❌ لا تختار حساب ميت

👉 ابعتلي حساب وأنا أقيمه لك.`;
}

```
else {
  reply = `وصلني سؤالك 👇
```

"${last}"

👉 خلينا نحدد:
شو الخطوة اللي واقف عندها بالضبط؟`;
}

```
res.json({ reply });
```

} catch (err) {
res.status(500).json({ reply: "صار خطأ — حاول مرة ثانية" });
}
});

// 🚀 مهم جداً لRailway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Server running on port " + PORT);
});
