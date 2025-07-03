import { CommandInteraction, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { getUserAccounts, switchActiveUID } from '../utils/userData';
import { COMMAND_NAMES } from '../constants/commands';

// アカウント一覧表示コマンド
export async function handleMyAccounts(interaction: CommandInteraction): Promise<void> {
    try {
        const userId = interaction.user.id;
        const accounts = await getUserAccounts(userId);

        if (!accounts || Object.keys(accounts).length === 0) {
            await interaction.reply({
                content: '❌ 登録されたアカウントがありません。`/register-uid`コマンドでUIDを登録してください。',
                ephemeral: true
            });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle('📋 登録済みアカウント一覧')
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter({ text: 'アカウント切り替えは /switch-uid コマンドを使用してください' });

        let description = '';
        for (const [uid, accountData] of Object.entries(accounts)) {
            const nickname = accountData.nickname || 'なし';
            const characterCount = accountData.characters ? Object.keys(accountData.characters).length : 0;
            const lastUpdated = new Date(accountData.lastUpdated).toLocaleDateString('ja-JP');
            
            description += `**UID:** ${uid}\n`;
            description += `**ニックネーム:** ${nickname}\n`;
            description += `**保存キャラクター数:** ${characterCount}体\n`;
            description += `**最終更新:** ${lastUpdated}\n\n`;
        }

        embed.setDescription(description);

        await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
        console.error('アカウント一覧取得エラー:', error);
        await interaction.reply({
            content: '❌ アカウント一覧の取得中にエラーが発生しました。',
            ephemeral: true
        });
    }
}

// UID切り替えコマンド
export async function handleSwitchUID(interaction: ChatInputCommandInteraction): Promise<void> {
    try {
        const uid = interaction.options.get('uid')?.value as string;
        const userId = interaction.user.id;

        // 入力値の検証
        if (!uid || !/^\d{9}$/.test(uid)) {
            await interaction.reply({
                content: '❌ 有効なUID（9桁の数字）を入力してください。',
                ephemeral: true
            });
            return;
        }

        const success = await switchActiveUID(userId, uid);

        if (!success) {
            await interaction.reply({
                content: `❌ UID ${uid} は登録されていません。先に \`/register-uid\` で登録してください。`,
                ephemeral: true
            });
            return;
        }

        await interaction.reply({
            content: `✅ アクティブなUIDを ${uid} に切り替えました！`,
            ephemeral: true
        });
    } catch (error) {
        console.error('UID切り替えエラー:', error);
        await interaction.reply({
            content: '❌ UID切り替え中にエラーが発生しました。',
            ephemeral: true
        });
    }
} 