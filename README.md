# 原神Discord Bot

原神のプレイヤー情報とキャラクター詳細を取得できるDiscord Botです。  
TypeScriptで書かれており、個人データの保存機能付きで快適に使用できます。

## ✨ 機能

### 📊 プレイヤー情報表示
- 冒険ランク、世界ランク、深境螺旋進捗
- プロフィール画像、ステータスメッセージ
- 所持キャラクター一覧（ボタン付き）

### 🎭 キャラクター詳細
- レベル、命ノ星座、戦闘ステータス
- 天賦レベル、聖遺物情報
- 自動保存機能（自分のキャラクターのみ）

### 💾 個人データ管理
- **UID登録**: 一度登録すれば入力不要
- **キャラクター保存**: 取得したキャラクター情報を自動保存
- **プライバシー保護**: 自分のデータのみ保存・表示

### 🚀 便利機能
- **スラッシュコマンド対応**: モダンなDiscordインターフェース
- **UID省略可能**: 登録済みなら引数不要
- **インタラクティブUI**: ボタンクリックで簡単操作

## 🎮 コマンド一覧

### 基本コマンド
- `/genshin [uid]` - プレイヤー情報を表示（UID省略時は登録済みUID使用）
- `/character <uid> <character_id>` - キャラクター詳細を表示

### 個人データ管理
- `/register-uid <uid>` - あなたのUIDを登録・更新
- `/my-genshin` - 登録済みUIDで原神情報を表示
- `/my-characters` - 保存されたキャラクター一覧を表示
- `/my-character <キャラクター名>` - 保存されたキャラクターの詳細を表示

## 📱 使用例

### 初回設定
```
/register-uid uid:801000880
```

### 情報取得（自動保存される）
```
/genshin
/character uid:801000880 character_id:10000002
```

### 保存データの確認
```
/my-characters
/my-character character_name:綾華
```

## 🏗️ プロジェクト構造

```
src/
├── index.ts                 # メインファイル
├── types/
│   └── index.ts            # 型定義
├── constants/
│   └── commands.ts         # コマンド定数
├── data/
│   └── characters.ts       # キャラクター名マッピング
├── utils/
│   └── userData.ts         # ユーザーデータ管理
└── commands/
    ├── index.ts            # コマンド定義
    ├── genshin.ts          # 原神情報取得
    ├── character.ts        # キャラクター詳細
    ├── register.ts         # UID登録
    ├── myGenshin.ts        # 登録済みUID使用
    └── myCharacters.ts     # 保存データ管理
```

## 🔧 開発・実行

### 開発モード
```bash
npm run dev
```

### 本番ビルド・実行
```bash
npm run build
npm start
```

### その他のコマンド
```bash
npm run watch    # ファイル変更監視
```

## 💾 データ保存

ユーザーデータは `userData.json` に保存されます：

```json
{
  "DiscordユーザーID": {
    "uid": "123456789",
    "nickname": "ユーザー名", 
    "lastUpdated": "2024-01-01T00:00:00.000Z",
    "characters": {
      "キャラクターID": {
        "data": { /* APIデータ */ },
        "characterName": "神里 綾華（氷）",
        "lastUpdated": "2024-01-01T00:00:00.000Z"
      }
    }
  }
}
```

## 🔗 使用API・参考資料

- **API**: [Enka Network](https://enka.network/) - 原神のプレイヤーデータを提供
- **参考記事**: [原神のステータスを取得するDiscordBotを作った話](https://qiita.com/CinnamonSea2073/items/92d9a479888b8581b2e2)

## 🛡️ プライバシー

- 登録したUIDは個人のみアクセス可能
- キャラクター情報は自分のUIDで取得した場合のみ自動保存
- 他人のデータを覗くことはできません

## 📝 ライセンス

ISC