// 必要なモジュールをインポート
require('dotenv').config();
const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
    REST,
    Routes
} = require('discord.js');
const axios = require('axios');

// Discordクライアントの作成
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const PREFIX = '!';

// キャラクター名の日本語マッピング（簡易版）
const characterNames = {
    '10000002': '神里 綾華（氷）',
    '10000003': 'ジン（風）',
    '10000005': '空（風）',
    '10000006': 'リサ（雷）',
    '10000007': '蛍（風）',
    '10000014': 'バーバラ（水）',
    '10000015': 'ガイア（氷）',
    '10000016': 'ディルック（火）',
    '10000020': 'レザー（雷）',
    '10000021': 'アンバー（炎）',
    '10000022': 'ウェンティ（風）',
    '10000023': '香菱（炎）',
    '10000024': '北斗（雷）',
    '10000025': '行秋（水）',
    '10000026': '魈（風）',
    '10000027': '凝光（岩）',
    '10000029': 'クレー（炎）',
    '10000030': '鍾離（岩）',
    '10000031': 'フィッシュル（雷）',
    '10000032': 'ベネット（炎）',
    '10000033': 'タルタリヤ（水）',
    '10000034': 'ノエル（岩）',
    '10000035': '七七（氷）',
    '10000036': '重雲（氷）',
    '10000037': '甘雨（氷）',
    '10000038': 'アルベド（岩）',
    '10000039': 'ディオナ（氷）',
    '10000041': 'モナ（水）',
    '10000042': '刻晴（雷）',
    '10000043': 'スクロース（風）',
    '10000044': '辛炎（炎）',
    '10000045': 'ロサリア（氷）',
    '10000046': '胡桃（炎）',
    '10000047': '楓原 万葉（風）',
    '10000048': '煙緋（炎）',
    '10000049': '宵宮（炎）',
    '10000050': 'トーマ（炎）',
    '10000051': 'エウルア（氷）',
    '10000052': '雷電 将軍（雷）',
    '10000053': '早柚（風）',
    '10000054': '珊瑚宮 心海（水）',
    '10000055': 'ゴロー（岩）',
    '10000056': '九条 裟羅（雷）',
    '10000057': '荒瀧 一斗（岩）',
    '10000058': '八重 神子（雷）',
    '10000059': '鹿野院 平蔵（風）',
    '10000060': '夜蘭（水）',
    '10000061': '綺良々（草）',
    '10000062': 'アーロイ（氷）',
    '10000063': '申鶴（氷）',
    '10000064': '雲董（岩）',
    '10000065': '久岐 忍（雷）',
    '10000066': '神里 綾人（水）',
    '10000067': 'コレイ（草）',
    '10000068': 'ドリー（雷）',
    '10000069': 'ティナリ（草）',
    '10000070': 'ニィロウ（水）',
    '10000071': 'セノ（雷）',
    '10000072': 'キャンディス（水）',
    '10000073': 'ナヒーダ（草）',
    '10000074': 'レイラ（氷）',
    '10000075': '放浪者（風）',
    '10000076': 'ファルザン（風）',
    '10000077': 'ヨォーヨ（草）',
    '10000078': 'アルハイゼン（草）',
    '10000079': 'ディシア（炎）',
    '10000080': 'ミカ（氷）',
    '10000081': 'カーヴェ（草）',
    '10000082': '白朮（草）',
    '10000083': 'リネット（風）',
    '10000084': 'リネ（炎）',
    '10000085': 'フレミネ（氷）',
    '10000086': 'リオセスリ（氷）',
    '10000087': 'ヌヴィレット（水）',
    '10000088': 'シャルロット（氷）',
    '10000089': 'フリーナ（水）',
    '10000090': 'シュヴルーズ（炎）',
    '10000091': 'ナヴィア（岩）',  
    '10000092': '嘉明（炎）',
    '10000093': '閑雲（風）',
    '10000094': '千織（岩）',
    '10000095': 'シグウィン（水）',
    '10000096': 'アルレッキーノ（炎）',
    '10000097': 'セトス（雷）',
    '10000098': 'クロリンデ（雷）',
    '10000099': 'エミリエ（草）',
    '10000100': 'カチーナ（岩）',
    '10000101': 'キイニチ（草）',
    '10000102': 'ムアラニ（水）',
    '10000103': 'シロネン（岩）',
    '10000104': 'チャスカ（草）',
    '10000105': 'オロルン（雷）',
    '10000106': 'マーヴィカ（炎）',
    '10000107': 'シトラリ（氷）',
    '10000108': '藍硯（風）',
    '10000109': '夢見月 瑞希（風）',
    '10000110': 'イアンサ（雷）',
    '10000111': 'ヴァレサ（雷）',
    '10000112': 'エスコフィエ（氷）',
    '10000113': 'イファ（風）',
    '10000114': 'スカーク（氷）',
    '10000115': 'ダリア（水）',
    '10000116': 'マハティ（草）',
    '10000117': 'マハティ（草）',
    '10000118': 'マハティ（草）',
    '10000119': 'マハティ（草）',
    '10000120': 'マハティ（草）',
};

// スラッシュコマンドの定義
const commands = [
    new SlashCommandBuilder()
        .setName('genshin')
        .setDescription('原神のプレイヤー情報を取得します')
        .addStringOption(option =>
            option.setName('uid')
                .setDescription('プレイヤーのUID')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('character')
        .setDescription('キャラクターの詳細情報を取得します')
        .addStringOption(option =>
            option.setName('uid')
                .setDescription('プレイヤーのUID')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('character_id')
                .setDescription('キャラクターID')
                .setRequired(true))
];

// ボットが準備できたときのイベント
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('原神', { type: 'PLAYING' });

    try {
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        console.log('スラッシュコマンドを登録中...');

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        console.log('スラッシュコマンドの登録が完了しました！');
    } catch (error) {
        console.error('スラッシュコマンドの登録に失敗しました:', error);
    }
});

// スラッシュコマンドの処理
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'genshin') {
        await handleGenshinCommand(interaction);
    } else if (commandName === 'character') {
        await handleCharacterCommand(interaction);
    }
});

// ボタンインタラクションの処理
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const [action, uid, characterId] = interaction.customId.split('_');

    if (action === 'character') {
        await showCharacterDetails(interaction, uid, characterId);
    }
});

// 原神コマンドの処理
async function handleGenshinCommand(interaction) {
    const uid = interaction.options.getString('uid');

    try {
        await interaction.deferReply();

        const apiUrl = `https://enka.network/api/uid/${uid}/`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        const playerInfo = data.playerInfo;
        if (!playerInfo) {
            return interaction.editReply(`UID \`${uid}\` のプレイヤー情報が見つかりませんでした。キャラクター詳細をプロフィールで公開しているか確認してください。`);
        }

        const characters = data.avatarInfoList || [];

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${playerInfo.nickname}さんの原神ステータス`)
            .setURL(`https://enka.network/u/${uid}/`)
            .setDescription(`UID: ${uid}`)
            .addFields(
                { name: '冒険ランク', value: `${playerInfo.level}`, inline: true },
                { name: '世界ランク', value: `${playerInfo.worldLevel}`, inline: true },
                { name: '深境螺旋', value: `第${playerInfo.towerFloorIndex}層 第${playerInfo.towerLevelIndex}間`, inline: true }
            );

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
                const charName = characterNames[char.avatarId] || `キャラID: ${char.avatarId}`;
                const level = char.propMap['4001'] ? char.propMap['4001'].val : 'N/A';

                buttons.push(
                    new ButtonBuilder()
                        .setCustomId(`character_${uid}_${char.avatarId}`)
                        .setLabel(`${charName} (Lv.${level})`)
                        .setStyle(ButtonStyle.Primary)
                );
            });
        }

        const row = new ActionRowBuilder().addComponents(buttons.slice(0, 5)); // Discordの制限で最大5個
        const rows = [];
        for (let i = 0; i < buttons.length; i += 5) {
            rows.push(new ActionRowBuilder().addComponents(buttons.slice(i, i + 5)));
        }

        await interaction.editReply({
            embeds: [embed],
            components: rows
        });

    } catch (error) {
        console.error(error);
        if (error.response) {
            if (error.response.status === 404) {
                await interaction.editReply(`UID \`${uid}\` のプレイヤー情報が見つかりませんでした。キャラクター詳細をプロフィールで公開しているか確認してください。`);
            } else if (error.response.status === 400) {
                await interaction.editReply(`UID \`${uid}\` は不正な形式です。`);
            } else if (error.response.status >= 500) {
                await interaction.editReply('Enka.Networkがメンテナンス中のようです。しばらくしてからもう一度お試しください。');
            } else {
                await interaction.editReply('情報の取得中に不明なエラーが発生しました。');
            }
        } else {
            await interaction.editReply('情報の取得中にエラーが発生しました。');
        }
    }
}

// キャラクターコマンドの処理
async function handleCharacterCommand(interaction) {
    const uid = interaction.options.getString('uid');
    const characterId = interaction.options.getString('character_id');

    await showCharacterDetails(interaction, uid, characterId);
}

// キャラクター詳細を表示
async function showCharacterDetails(interaction, uid, characterId) {
    try {
        await interaction.deferReply();

        const apiUrl = `https://enka.network/api/uid/${uid}/`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        const characters = data.avatarInfoList || [];
        const character = characters.find(char => char.avatarId === characterId);

        if (!character) {
            return interaction.editReply('指定されたキャラクターが見つかりませんでした。');
        }

        const charName = characterNames[characterId] || `キャラID: ${characterId}`;
        const level = character.propMap['4001'] ? character.propMap['4001'].val : 'N/A';
        const constellation = character.propMap['4002'] ? character.propMap['4002'].val : '0';

        const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle(`${charName}の詳細情報`)
            .setDescription(`UID: ${uid}`)
            .addFields(
                { name: 'レベル', value: `${level}`, inline: true },
                { name: '命ノ星座', value: `${constellation}`, inline: true }
            );

        // 戦闘ステータス
        if (character.fightPropMap) {
            const stats = character.fightPropMap;
            embed.addFields(
                { name: 'HP', value: `${Math.round(stats['2000'] || 0)}`, inline: true },
                { name: '攻撃力', value: `${Math.round(stats['2001'] || 0)}`, inline: true },
                { name: '防御力', value: `${Math.round(stats['2002'] || 0)}`, inline: true },
                { name: '会心率', value: `${((stats['20'] || 0) * 100).toFixed(1)}%`, inline: true },
                { name: '会心ダメージ', value: `${((stats['22'] || 0) * 100).toFixed(1)}%`, inline: true },
                { name: '元素チャージ効率', value: `${((stats['23'] || 0) * 100).toFixed(1)}%`, inline: true }
            );
        }

        // 天賦レベル
        if (character.skillLevelMap) {
            const skillLevels = Object.values(character.skillLevelMap);
            embed.addFields({ name: '天賦レベル', value: skillLevels.join(' / '), inline: false });
        }

        // 聖遺物情報
        if (character.equipList) {
            const artifacts = character.equipList.filter(item => item.flat?.reliquaryMainstat);
            if (artifacts.length > 0) {
                const artifactInfo = artifacts.map(artifact => {
                    const setName = artifact.flat.setNameTextMapHash || '不明';
                    const equipType = artifact.flat.equipType || '不明';
                    const mainStat = artifact.flat.reliquaryMainstat?.mainPropId || '不明';
                    const mainValue = artifact.flat.reliquaryMainstat?.statValue || '不明';
                    const level = artifact.reliquary?.level || 0;

                    return `**${equipType}** (${setName})\n${mainStat}: ${mainValue}\n強化レベル: ${level}`;
                }).join('\n\n');

                embed.addFields({ name: '聖遺物', value: artifactInfo, inline: false });
            }
        }

        await interaction.editReply({ embeds: [embed] });

    } catch (error) {
        console.error(error);
        await interaction.editReply('キャラクター情報の取得中にエラーが発生しました。');
    }
}

// Discordにログイン
client.login(process.env.DISCORD_TOKEN); 