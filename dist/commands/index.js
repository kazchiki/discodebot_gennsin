"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const discord_js_1 = require("discord.js");
const commands_1 = require("../constants/commands");
exports.commands = [
    new discord_js_1.SlashCommandBuilder()
        .setName(commands_1.COMMAND_NAMES.GENSHIN)
        .setDescription(commands_1.COMMAND_DESCRIPTIONS.GENSHIN)
        .addStringOption(option => option.setName(commands_1.OPTION_NAMES.UID)
        .setDescription(commands_1.OPTION_DESCRIPTIONS.UID + '（省略時は登録済みUID使用）')
        .setRequired(false)), // オプショナルに変更
    new discord_js_1.SlashCommandBuilder()
        .setName(commands_1.COMMAND_NAMES.CHARACTER)
        .setDescription(commands_1.COMMAND_DESCRIPTIONS.CHARACTER)
        .addStringOption(option => option.setName(commands_1.OPTION_NAMES.UID)
        .setDescription(commands_1.OPTION_DESCRIPTIONS.UID)
        .setRequired(true))
        .addStringOption(option => option.setName(commands_1.OPTION_NAMES.CHARACTER_ID)
        .setDescription(commands_1.OPTION_DESCRIPTIONS.CHARACTER_ID)
        .setRequired(true)),
    new discord_js_1.SlashCommandBuilder()
        .setName(commands_1.COMMAND_NAMES.REGISTER)
        .setDescription(commands_1.COMMAND_DESCRIPTIONS.REGISTER)
        .addStringOption(option => option.setName(commands_1.OPTION_NAMES.UID)
        .setDescription(commands_1.OPTION_DESCRIPTIONS.UID)
        .setRequired(true))
        .addStringOption(option => option.setName(commands_1.OPTION_NAMES.NICKNAME)
        .setDescription(commands_1.OPTION_DESCRIPTIONS.NICKNAME)
        .setRequired(false)),
    new discord_js_1.SlashCommandBuilder()
        .setName(commands_1.COMMAND_NAMES.MY_INFO)
        .setDescription(commands_1.COMMAND_DESCRIPTIONS.MY_INFO),
    new discord_js_1.SlashCommandBuilder()
        .setName(commands_1.COMMAND_NAMES.MY_CHARACTERS)
        .setDescription(commands_1.COMMAND_DESCRIPTIONS.MY_CHARACTERS),
    new discord_js_1.SlashCommandBuilder()
        .setName(commands_1.COMMAND_NAMES.MY_CHARACTER)
        .setDescription(commands_1.COMMAND_DESCRIPTIONS.MY_CHARACTER)
        .addStringOption(option => option.setName(commands_1.OPTION_NAMES.CHARACTER_NAME)
        .setDescription(commands_1.OPTION_DESCRIPTIONS.CHARACTER_NAME)
        .setRequired(true)),
    new discord_js_1.SlashCommandBuilder()
        .setName(commands_1.COMMAND_NAMES.MY_ACCOUNTS)
        .setDescription(commands_1.COMMAND_DESCRIPTIONS.MY_ACCOUNTS),
    new discord_js_1.SlashCommandBuilder()
        .setName(commands_1.COMMAND_NAMES.SWITCH_UID)
        .setDescription(commands_1.COMMAND_DESCRIPTIONS.SWITCH_UID)
        .addStringOption(option => option.setName(commands_1.OPTION_NAMES.UID)
        .setDescription(commands_1.OPTION_DESCRIPTIONS.UID)
        .setRequired(true))
];
//# sourceMappingURL=index.js.map