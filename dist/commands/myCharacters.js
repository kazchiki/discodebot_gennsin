"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMyCharactersCommand = handleMyCharactersCommand;
exports.handleMyCharacterCommand = handleMyCharacterCommand;
const discord_js_1 = require("discord.js");
const userData_1 = require("../utils/userData");
const commands_1 = require("../constants/commands");
// 保存されたキャラクター一覧を表示
async function handleMyCharactersCommand(interaction) {
    const userId = interaction.user.id;
    try {
        await interaction.deferReply({ ephemeral: true });
        const savedCharacters = await (0, userData_1.getUserCharacters)(userId);
        if (!savedCharacters || Object.keys(savedCharacters).length === 0) {
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0xFFFF00)
                .setTitle('📋 保存されたキャラクター')
                .setDescription('まだキャラクター情報が保存されていません。\n\n' +
                '💡 **キャラクター情報の保存方法:**\n' +
                '1. `/register-uid` でUIDを登録\n' +
                '2. `/character` コマンドで自分のキャラクター詳細を表示\n' +
                '→ 自動的に保存されます！')
                .setFooter({ text: `${interaction.user.username}` })
                .setTimestamp();
            await interaction.editReply({ embeds: [embed] });
            return;
        }
        const characterList = Object.entries(savedCharacters)
            .map(([characterId, data]) => {
            const level = data.data.propMap['4001']?.val || '不明';
            const constellation = data.data.propMap['4002']?.val || '0';
            const lastUpdated = new Date(data.lastUpdated).toLocaleDateString('ja-JP');
            return `🎭 **${data.characterName}**\n` +
                `　　レベル: ${level} | 凸数: ${constellation}\n` +
                `　　更新日: ${lastUpdated}`;
        })
            .join('\n\n');
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('📋 保存されたキャラクター一覧')
            .setDescription(characterList)
            .addFields({
            name: '💡 使い方',
            value: '特定キャラクターの詳細を見るには `/my-character` コマンドを使用してください。',
            inline: false
        })
            .setFooter({ text: `${interaction.user.username} | 合計: ${Object.keys(savedCharacters).length}体` })
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
    }
    catch (error) {
        console.error('保存されたキャラクター一覧取得エラー:', error);
        await interaction.editReply('❌ キャラクター一覧の取得中にエラーが発生しました。');
    }
}
// 特定の保存されたキャラクター詳細を表示
async function handleMyCharacterCommand(interaction) {
    const userId = interaction.user.id;
    const characterName = interaction.options.getString(commands_1.OPTION_NAMES.CHARACTER_NAME);
    try {
        await interaction.deferReply({ ephemeral: true });
        const savedCharacters = await (0, userData_1.getUserCharacters)(userId);
        if (!savedCharacters) {
            await interaction.editReply('❌ キャラクター情報が保存されていません。');
            return;
        }
        // キャラクター名で検索
        const characterEntry = Object.entries(savedCharacters)
            .find(([_, data]) => data.characterName.includes(characterName));
        if (!characterEntry) {
            const availableNames = Object.values(savedCharacters)
                .map(data => data.characterName)
                .join('\n・');
            await interaction.editReply(`❌ 「${characterName}」に一致するキャラクターが見つかりませんでした。\n\n` +
                `**保存されたキャラクター:**\n・${availableNames}`);
            return;
        }
        const [characterId, savedData] = characterEntry;
        const character = savedData.data;
        const charName = savedData.characterName;
        // キャラクター詳細を表示
        await displaySavedCharacterDetails(interaction, character, charName, savedData.lastUpdated);
    }
    catch (error) {
        console.error('保存されたキャラクター詳細取得エラー:', error);
        await interaction.editReply('❌ キャラクター詳細の取得中にエラーが発生しました。');
    }
}
// 保存されたキャラクター詳細の表示ロジック
async function displaySavedCharacterDetails(interaction, character, charName, lastUpdated) {
    const level = character.propMap['4001'] ? character.propMap['4001'].val : 'N/A';
    const constellation = character.propMap['4002'] ? character.propMap['4002'].val : '0';
    const embed = new discord_js_1.EmbedBuilder()
        .setColor(0x9932CC) // 保存データは紫色で区別
        .setTitle(`💾 ${charName}の保存データ`)
        .setDescription(`最終更新: ${new Date(lastUpdated).toLocaleString('ja-JP')}`)
        .addFields({ name: 'レベル', value: `${level}`, inline: true }, { name: '命ノ星座', value: `${constellation}`, inline: true }, { name: '　', value: '　', inline: true } // スペーサー
    );
    // 戦闘ステータス
    if (character.fightPropMap) {
        const stats = character.fightPropMap;
        embed.addFields({ name: 'HP', value: `${Math.round(stats['2000'] || 0)}`, inline: true }, { name: '攻撃力', value: `${Math.round(stats['2001'] || 0)}`, inline: true }, { name: '防御力', value: `${Math.round(stats['2002'] || 0)}`, inline: true }, { name: '会心率', value: `${((stats['20'] || 0) * 100).toFixed(1)}%`, inline: true }, { name: '会心ダメージ', value: `${((stats['22'] || 0) * 100).toFixed(1)}%`, inline: true }, { name: '元素チャージ効率', value: `${((stats['23'] || 0) * 100).toFixed(1)}%`, inline: true });
    }
    // 天賦レベル
    if (character.skillLevelMap) {
        const skillLevels = Object.values(character.skillLevelMap);
        embed.addFields({ name: '天賦レベル', value: skillLevels.join(' / '), inline: false });
    }
    // 聖遺物情報（簡略版）
    if (character.equipList) {
        const artifacts = character.equipList.filter((item) => item.flat?.reliquaryMainstat);
        if (artifacts.length > 0) {
            const artifactSummary = `聖遺物装備数: ${artifacts.length}個`;
            embed.addFields({ name: '聖遺物', value: artifactSummary, inline: false });
        }
    }
    embed.addFields({
        name: '🔄 最新情報を取得',
        value: '最新の情報を確認するには `/character` コマンドを使用してください。',
        inline: false
    });
    await interaction.editReply({ embeds: [embed] });
}
//# sourceMappingURL=myCharacters.js.map