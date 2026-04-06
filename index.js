const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

// 📍 روم الشات
const CHANNEL_ID = "1359279342542389378";

// 🔊 روم الصوت
const VOICE_CHANNEL_ID = "1359226687216418856";

// ✏️ الاختصارات
const shortcuts = {
  "ق": "🎮 قيم ونقسم",
  "ش": "⚽ شوط ونقسم",
  "تق": `🔥 تقسيمة الآن حياكم\n🔊 توجهوا: <#1483220557796479098>`,
  "ان1": "🚨 أي شخص برا يدخل روم التقسيمة إذا نقص تكملنا"
};

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;

  // 🔒 يشتغل فقط في هذا الروم
  if (msg.channel.id !== CHANNEL_ID) return;

  const content = msg.content.trim();

  try {

    // 🔥 الاختصارات
    if (shortcuts[content]) {
      await msg.delete();

      return msg.channel.send({
        content: `${shortcuts[content]}\n@everyone`
      });
    }

    // 🔢 الأرقام
    if (!isNaN(content)) {
      await msg.delete();

      return msg.channel.send({
        content: `🚨 ${content} بالانتظار ونفك 4 فرق\n@everyone`
      });
    }

  } catch (err) {
    console.log("❌ خطأ:", err);
  }
});

client.once("ready", () => {
  console.log(`✅ ${client.user.tag} شغال`);
});

client.login(TOKEN);
