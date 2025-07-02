import { SlashCommandBuilder } from 'discord.js';
import { 
    COMMAND_NAMES, 
    COMMAND_DESCRIPTIONS, 
    OPTION_NAMES, 
    OPTION_DESCRIPTIONS 
} from '../constants/commands';

export const commands = [
    new SlashCommandBuilder()
        .setName(COMMAND_NAMES.GENSHIN)
        .setDescription(COMMAND_DESCRIPTIONS.GENSHIN)
        .addStringOption(option =>
            option.setName(OPTION_NAMES.UID)
                .setDescription(OPTION_DESCRIPTIONS.UID + '（省略時は登録済みUID使用）')
                .setRequired(false)), // オプショナルに変更
    
    new SlashCommandBuilder()
        .setName(COMMAND_NAMES.CHARACTER)
        .setDescription(COMMAND_DESCRIPTIONS.CHARACTER)
        .addStringOption(option =>
            option.setName(OPTION_NAMES.UID)
                .setDescription(OPTION_DESCRIPTIONS.UID)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(OPTION_NAMES.CHARACTER_ID)
                .setDescription(OPTION_DESCRIPTIONS.CHARACTER_ID)
                .setRequired(true)),
    
    new SlashCommandBuilder()
        .setName(COMMAND_NAMES.REGISTER)
        .setDescription(COMMAND_DESCRIPTIONS.REGISTER)
        .addStringOption(option =>
            option.setName(OPTION_NAMES.UID)
                .setDescription(OPTION_DESCRIPTIONS.UID)
                .setRequired(true)),
    
    new SlashCommandBuilder()
        .setName(COMMAND_NAMES.MY_INFO)
        .setDescription(COMMAND_DESCRIPTIONS.MY_INFO),
    
    new SlashCommandBuilder()
        .setName(COMMAND_NAMES.MY_CHARACTERS)
        .setDescription(COMMAND_DESCRIPTIONS.MY_CHARACTERS),
    
    new SlashCommandBuilder()
        .setName(COMMAND_NAMES.MY_CHARACTER)
        .setDescription(COMMAND_DESCRIPTIONS.MY_CHARACTER)
        .addStringOption(option =>
            option.setName(OPTION_NAMES.CHARACTER_NAME)
                .setDescription(OPTION_DESCRIPTIONS.CHARACTER_NAME)
                .setRequired(true))
]; 