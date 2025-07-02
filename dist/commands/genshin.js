"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGenshinLogic = executeGenshinLogic;
exports.handleGenshinCommand = handleGenshinCommand;
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const characters_1 = require("../data/characters");
const commands_1 = require("../constants/commands");
const userData_1 = require("../utils/userData");
// 原神情報取得の共通ロジック
async function executeGenshinLogic(interaction, uid) {
    try {
        await interaction.deferReply();
        const apiUrl = `https://enka.network/api/uid/${uid}/`;
        const response = await axios_1.default.get(apiUrl);
        const data = response.data;
        const playerInfo = data.playerInfo;
        if (!playerInfo) {
            await interaction.editReply(`UID \`${uid}\` のプレイヤー情報が見つかりませんでした。キャラクター詳細をプロフィールで公開しているか確認してください。`);
            return;
        }
        const characters = data.avatarInfoList || [];
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${playerInfo.nickname}さんの原神ステータス`)
            .setURL(`https://enka.network/u/${uid}/`)
            .setDescription(`UID: ${uid}`)
            .addFields({ name: '冒険ランク', value: `${playerInfo.level}`, inline: true }, { name: '世界ランク', value: `${playerInfo.worldLevel}`, inline: true }, { name: '深境螺旋', value: `第${playerInfo.towerFloorIndex}層 第${playerInfo.towerLevelIndex}間`, inline: true });
        if (playerInfo.signature) {
            embed.addFields({ name: 'ステータスメッセージ', value: playerInfo.signature, inline: false });
        }
        if (playerInfo.profilePicture?.avatarId) {
            embed.setThumbnail(`https://enka.network/ui/${playerInfo.profilePicture.avatarId}.png`);
        }
        // キャラクターボタンを作成
        const buttons = [];
        if (characters.length > 0) {
            characters.forEach(char => {
                const charName = characters_1.characterNames[char.avatarId] || `キャラID: ${char.avatarId}`;
                const level = char.propMap['4001'] ? char.propMap['4001'].val : 'N/A';
                buttons.push(new discord_js_1.ButtonBuilder()
                    .setCustomId(`character_${uid}_${char.avatarId}`)
                    .setLabel(`${charName} (Lv.${level})`)
                    .setStyle(discord_js_1.ButtonStyle.Primary));
            });
        }
        const rows = [];
        for (let i = 0; i < buttons.length; i += 5) {
            rows.push(new discord_js_1.ActionRowBuilder().addComponents(buttons.slice(i, i + 5)));
        }
        await interaction.editReply({
            embeds: [embed],
            components: rows
        });
    }
    catch (error) {
        console.error(error);
        if (error.response) {
            if (error.response.status === 404) {
                await interaction.editReply(`UID \`${uid}\` のプレイヤー情報が見つかりませんでした。キャラクター詳細をプロフィールで公開しているか確認してください。`);
            }
            else if (error.response.status === 400) {
                await interaction.editReply(`UID \`${uid}\` は不正な形式です。`);
            }
            else if (error.response.status >= 500) {
                await interaction.editReply('Enka.Networkがメンテナンス中のようです。しばらくしてからもう一度お試しください。');
            }
            else {
                await interaction.editReply('情報の取得中に不明なエラーが発生しました。');
            }
        }
        else {
            await interaction.editReply('情報の取得中にエラーが発生しました。');
        }
    }
}
// スラッシュコマンドのハンドラー（UIDを引数から取得、省略時は登録済みUID使用）
async function handleGenshinCommand(interaction) {
    let uid = interaction.options.getString(commands_1.OPTION_NAMES.UID);
    // UIDが指定されていない場合、登録済みUIDを使用
    if (!uid) {
        const savedUID = await (0, userData_1.getUserUID)(interaction.user.id);
        if (!savedUID) {
            await interaction.reply({
                content: '❌ UIDが指定されておらず、登録もされていません。\n' +
                    '- UIDを指定するか\n' +
                    '- `/register-uid` コマンドでUIDを登録してください。',
                ephemeral: true
            });
            return;
        }
        uid = savedUID;
    }
    await executeGenshinLogic(interaction, uid);
}
//# sourceMappingURL=genshin.js.map