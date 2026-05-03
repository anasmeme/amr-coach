import express from "express"; import fetch from "node-fetch"; import cors from "cors";
const app = express(); app.use(cors()); app.use(express.json());
const API_KEY = "PUT_OPENAI_KEY";
// ======================= // 🧠 MEMORY + STATE // ======================= let users = {};
function initUser(id){ if(!users[id]){ users[id] = { phase:"execution", tasks:[ {id:1,text:"ابحث عن 3 حسابات",done:false}, {id:2,text:"اكتب رسالة مخصصة",done:false}, {id:3,text:"أرسل الرسالة",done:false} ], tries:0, fail:0, history:[], messages:[], lastAction:Date.now() }; } }
// ======================= // 📊 GET USER STATE // ======================= app.get("/user/:id",(req,res)=>{ initUser(req.params.id); res.json(users[req.params.id]); });
// ======================= // ✅ COMPLETE TASK // ======================= app.post("/task/complete",(req,res)=>{ const {userId,taskId} = req.body; initUser(userId);
let u = users[userId]; let t = u.tasks.find(x=>x.id==taskId);
if(t){ t.done = true; u.history.push(تم تنفيذ: ${t.text}); u.lastAction = Date.now(); }
res.json({success:true}); });
// ======================= // 🧠 DECISION ENGINE // ======================= function analyze(u){
let done = u.tasks.filter(t=>t.done).length;
if(done === 0 && u.tries > 1){ u.fail++; return {type:"fail", msg:"لم تبدأ التنفيذ"}; }
if(u.fail >= 2){ return {type:"critical", msg:"تهرب واضح"}; }
if(done < u.tasks.length){ return {type:"incomplete", msg:"كمل المهام"}; }
// 🎯 Phase upgrade if(u.phase === "execution"){ u.phase = "closing"; return {type:"phase_up", msg:"انتقل لمرحلة البيع"}; }
return {type:"done", msg:"أكملت اليوم"}; }
// ======================= // 🎭 COACH AI // ======================= async function coach(u, decision){
const system =  أنت AMR Coach. صارم، مباشر، لا تعطي خيارات. تعطي خطوة واحدة فقط.
الحالة: Phase: ${u.phase} Fail count: ${u.fail}
هدفك: دفع المستخدم للتنفيذ فوراً ;
const userPrompt =  المستخدم حالته: ${decision.msg}
آخر أفعاله: ${u.history.slice(-3).join("\n")}
اعطه أمر مباشر الآن ;
const response = await fetch("https://api.openai.com/v1/chat/completions",{ method:"POST", headers:{ "Authorization":Bearer ${API_KEY}, "Content-Type":"application/json" }, body:JSON.stringify({ model:"gpt-4.1-mini", messages:[ {role:"system",content:system}, {role:"user",content:userPrompt} ] }) });
const data = await response.json(); return data.choices[0].message.content; }
// ======================= // ⚡️ ENGINE // ======================= app.post("/engine", async (req,res)=>{ const {userId} = req.body; initUser(userId);
let u = users[userId]; u.tries++;
let decision = analyze(u);
let ai = null;
if(["fail","critical","phase_up"].includes(decision.type)){ ai = await coach(u, decision); }
res.json({ phase:u.phase, tasks:u.tasks, decision, ai }); });
// ======================= // 🧑‍💼 ADMIN DASHBOARD // ======================= app.get("/admin/users",(req,res)=>{ res.json(users); });
app.listen(3000, ()=>console.log("AMR SYSTEM LIVE"));
