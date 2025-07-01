# 原神Discord Bot

原神のプレイヤー情報とキャラクター詳細を取得できるDiscord Botです。

## 機能

- **プレイヤー情報表示**: 冒険ランク、世界ランク、深境螺旋進捗など
- **キャラクター詳細**: レベル、命ノ星座、戦闘ステータス、天賦レベル
- **聖遺物情報**: セット名、メインステータス、強化レベル
- **インタラクティブUI**: ボタンクリックでキャラクター詳細を表示
- **スラッシュコマンド対応**: モダンなDiscordコマンド

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env`ファイルを作成し、以下の内容を設定してください：

```env
DISCORD_TOKEN=your_discord_bot_token_here
```

### 3. Discord Bot Tokenの取得

1. [Discord Developer Portal](https://discord.com/developers/applications)にアクセス
2. 「New Application」をクリック
3. アプリケーション名を入力して作成
4. 左メニューから「Bot」を選択
5. 「Add Bot」をクリック
6. 「Token」セクションの「Copy」をクリックしてトークンをコピー
7. `.env`ファイルの`DISCORD_TOKEN`に貼り付け

### 4. Botの権限設定

1. Discord Developer Portalの「OAuth2」→「URL Generator」を選択
2. Scopesで「bot」を選択
3. Bot Permissionsで以下を選択：
   - Send Messages
   - Use Slash Commands
   - Embed Links
   - Attach Files
4. 生成されたURLでBotをサーバーに招待

### 5. Botの起動

```bash
node index.js
```

## 使用方法

### スラッシュコマンド

- `/genshin <uid>` - プレイヤーの基本情報を表示
- `/character <uid> <character_id>` - 特定キャラクターの詳細情報を表示

### 例

```
/genshin 800000000
/character 800000000 10000020
```

## 参考資料

このBotは以下の記事を参考に作成されています：
- [原神のステータスを取得するDiscordBotを作った話](https://qiita.com/CinnamonSea2073/items/92d9a479888b8581b2e2)

## 使用API

- [Enka Network](https://enka.network/) - 原神のプレイヤーデータを提供

## ライセンス

ISC