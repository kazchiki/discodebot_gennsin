const discord = require('discord.js');
const { TOKEN } = require('./config/config');
const { setClient, sendReply } = require('./utils/messageUtils');
const { startServer } = require('./utils/httpServer');
const { handleTeamCommand } = require('./commands/teamCommand');
const { handleAlhaithamCommand, handleYanfeiCommand, handleTohmaCommand, handlePaimonCommand } = require('./commands/phraseCommands');
const { handleShutdownCommand } = require('./commands/systemCommands');

// Discordクライアントを作成
const client = new discord.Client();

// HTTPサーバーを起動
startServer();

// クライアントの準備が完了したときのイベント
client.on('ready', () => {
  console.log('Bot準備完了～');
  client.user.setPresence({ activity: { name: '原神' } });
  
  // メッセージユーティリティにクライアントを設定
  setClient(client);
});

// メッセージを受信したときのイベント
client.on('message', async (message) => {
  // ボット自身のメッセージやボットからのメッセージを無視
  if (message.author.id === client.user.id || message.author.bot) {
    return;
  }

  // ボットへのメンションの場合
  if (message.isMemberMentioned(client.user)) {
    await sendReply(message, "呼んだか？");
    return;
  }

  // ランダムチームコマンド
  if (message.content.match(/^\/チーム|^\/team|^\/ランダムチーム|^\/randomteam/)) {
    await handleTeamCommand(message);
    return;
  }

  // アルハイゼン構文コマンド
  if (message.content.match(/^\/アルハイゼン|^\/alhaitham|^\/構文/)) {
    await handleAlhaithamCommand(message);
    return;
  }

  // 煙緋コマンド
  if (message.content.match(/^\/煙緋|^\/yanfei|^\/はむ/)) {
    await handleYanfeiCommand(message);
    return;
  }

  // パイモン反応（「えへ」が含まれている場合）
  if (message.content.includes('えへ')) {
    await handlePaimonCommand(message);
    return;
  }

  // 俺が…シリーズ
  if (message.content.match(/俺/)) {
    await handleTohmaCommand(message);
    return;
  }

  // ボット終了コマンド
  if (message.content.match(/^\/終了|^\/exit|^\/quit|^\/stop/)) {
    await handleShutdownCommand(message);
    return;
  }
});

// エラーハンドリング
client.on('error', error => {
  console.error('Discord client error:', error);
});

// プロセス終了時のエラーハンドリング
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

// TOKENの確認とログイン
if (!TOKEN) {
  console.log('TOKENが設定されていません。');
  process.exit(0);
}

client.login(TOKEN); 