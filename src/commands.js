
import { InlineKeyboard } from "grammy"

const EBOOK_URL = "https://pirvnha.gumroad.com/l/guide-vinted-achat-revente"

export function registerCommands(bot) {
  bot.command("start", async (ctx) => {
    await ctx.reply(
      `👋 Bienvenue chez LATECH${ctx.from?.first_name ? `, ${ctx.from.first_name}` : ""} !

📘 Tu veux apprendre les bases de l'achat-revente sur Vinted ?

Découvre notre guide numérique pour apprendre à démarrer, choisir tes articles et mieux gérer ton budget.

👇 Clique ci-dessous pour découvrir le guide.`,
      {
        reply_markup: new InlineKeyboard()
          .url("📘 Découvrir le guide Vinted", EBOOK_URL)
          .row()
          .text("ℹ️ Aide", "help"),
      },
    )
  })

  bot.command("ebook", (ctx) =>
    ctx.reply("📘 Voici le lien pour découvrir le guide LATECH :", {
      reply_markup: new InlineKeyboard().url("Découvrir le guide", EBOOK_URL),
    }),
  )

  bot.command("help", (ctx) =>
    ctx.reply(
      "🤖 Commandes LATECH\n\n/start — Message d'accueil\n/ebook — Accéder au guide Vinted\n/help — Afficher cette aide\n/ping — Vérifier que le bot fonctionne",
    ),
  )

  bot.command("ping", (ctx) => ctx.reply("✅ LATECH est en ligne !"))

  bot.command("id", (ctx) =>
    ctx.reply(`ID du chat : ${ctx.chat.id}\nTon ID : ${ctx.from?.id ?? "inconnu"}`),
  )

  bot.callbackQuery("help", async (ctx) => {
    await ctx.answerCallbackQuery()
    await ctx.reply(
      "Besoin d'aide ? Utilise /ebook pour retrouver le lien du guide ou /start pour revenir à l'accueil.",
    )
  })

  bot.callbackQuery("ping", (ctx) => ctx.answerCallbackQuery({ text: "LATECH est en ligne !" }))

  bot.on("message:text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) return
    await ctx.reply("👋 Merci pour ton message ! Utilise /ebook pour découvrir notre guide Vinted.")
  })
}
