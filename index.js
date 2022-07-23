const fs = require("fs");
const chalk = require("chalk");

const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const { DEFAULT_PREFIX, BOT_TOKEN, ERROR_LOGS_CHANNEL, YT_COOKIE } = require("./config.json");
const { loadCommands } = require("./handler/loadCommands");
const { loadEvents } = require("./handler/loadEvents");
const { loadSlashCommands } = require("./handler/loadSlashCommands")
const { loadPlayerEvents } = require("./handler/loadPlayerEvents");
const { DiscordTogether } = require('discord-together');
const { Player } = require('discord-player');
const Enmap = require("enmap");

const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: 32767
});
const { checkValid } = require("./functions/validation/checkValid");
const Embeds = require("./functions/embeds/Embeds");
const Logger = require("./functions/Logger/Logger");
const Util = require("./functions/util/Util");

client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
client.slash = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
const Timeout = new Collection();
client.snipes = new Collection()
client.config = require("./botconfig/main.json");
require("./handler")(client);
client.setMaxListeners(0);
const Cookie = YT_COOKIE;
client.logger = Logger;
client.utils = Util;
client.say = Embeds;
const player = new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: false,
  leaveOnEmpty: false,
  leaveOnEmptyCooldown: 600,
  autoSelfDeaf: true,
  initialVolume: 100,
  ytdlDownloadOptions: {
    requestOptions: {
      headers: {
        cookie: Cookie,
      }
    }
  },
});

client.player = player;
client.db = new Enmap({ name: "musicdb" });

loadCommands(client);
loadEvents(client);
loadPlayerEvents(client);
loadSlashCommands(client);
checkValid();

// Error Handling

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);

  const exceptionembed = new MessageEmbed()
  .setTitle("Uncaught Exception")
  .setDescription(`${err}`)
  .setColor("RED")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [exceptionembed] })
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );

   const rejectionembed = new MessageEmbed()
  .setTitle("Unhandled Promise Rejection")
  .addField("Promise", `${promise}`)
  .addField("Reason", `${reason.message}`)
  .setColor("RED")
  client.channels.cache.get(ERROR_LOGS_CHANNEL).send({ embeds: [rejectionembed] })
});
const db = require("quick.db")
const countingSchema = require("./schemas/counting") 
let pagination = require('./function/pagination') 
const eco = require('./schemas/economy');

client.login(BOT_TOKEN || process.env.TOKEN).then(() => {
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.tag}`
    )
  );
});
const Levels = require("discord-xp");

const { mongooseConnectionString } = require("./botconfig/main.json");

Levels.setURL(mongooseConnectionString);
// Hey! There if you're using a hosting service provider which supports "env" files then please go to shell and execute this command "$./setup_env.sh"
/**
 * @INFO
 * Bot Coded by iRed#1330 | https://github.com/iRed-Github/Chronium-BOT
 * @INFO
 * Join iDK Development | https://dsc.gg/idk-development
 * @INFO
 * Please mention Her / iDK Development, when using this Code!
 * @INFO
 */
