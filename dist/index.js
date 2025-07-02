"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 必要なモジュールをインポート
require("dotenv/config");
const discord_js_1 = require("discord.js");
// 分離したモジュールをインポート
const commands_1 = require("./commands");
const genshin_1 = require("./commands/genshin");
const character_1 = require("./commands/character");
const register_1 = require("./commands/register");
const myGenshin_1 = require("./commands/myGenshin");
const myCharacters_1 = require("./commands/myCharacters");
const accounts_1 = require("./commands/accounts");
const commands_2 = require("./constants/commands");
// Discordクライアントの作成
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ]
});
// ボットが準備できたときのイベント
client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    client.user?.setActivity('原神', { type: discord_js_1.ActivityType.Playing });
    try {
        const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        console.log('スラッシュコマンドを登録中...');
        await rest.put(discord_js_1.Routes.applicationCommands(client.user.id), { body: commands_1.commands });
        console.log('スラッシュコマンドの登録が完了しました！');
    }
    catch (error) {
        console.error('スラッシュコマンドの登録に失敗しました:', error);
    }
});
// スラッシュコマンドの処理
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const { commandName } = interaction;
    if (commandName === commands_2.COMMAND_NAMES.GENSHIN) {
        await (0, genshin_1.handleGenshinCommand)(interaction);
    }
    else if (commandName === commands_2.COMMAND_NAMES.CHARACTER) {
        await (0, character_1.handleCharacterCommand)(interaction);
    }
    else if (commandName === commands_2.COMMAND_NAMES.REGISTER) {
        await (0, register_1.handleRegisterCommand)(interaction);
    }
    else if (commandName === commands_2.COMMAND_NAMES.MY_INFO) {
        await (0, myGenshin_1.handleMyGenshinCommand)(interaction);
    }
    else if (commandName === commands_2.COMMAND_NAMES.MY_CHARACTERS) {
        await (0, myCharacters_1.handleMyCharactersCommand)(interaction);
    }
    else if (commandName === commands_2.COMMAND_NAMES.MY_CHARACTER) {
        await (0, myCharacters_1.handleMyCharacterCommand)(interaction);
    }
    else if (commandName === commands_2.COMMAND_NAMES.MY_ACCOUNTS) {
        await (0, accounts_1.handleMyAccounts)(interaction);
    }
    else if (commandName === commands_2.COMMAND_NAMES.SWITCH_UID) {
        await (0, accounts_1.handleSwitchUID)(interaction);
    }
});
// ボタンインタラクションの処理
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton())
        return;
    const [action, uid, characterId] = interaction.customId.split('_');
    if (action === 'character') {
        await (0, character_1.showCharacterDetails)(interaction, uid, characterId);
    }
});
// Discordにログイン
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=index.js.map