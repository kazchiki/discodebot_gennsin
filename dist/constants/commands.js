"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPTION_DESCRIPTIONS = exports.OPTION_NAMES = exports.COMMAND_DESCRIPTIONS = exports.COMMAND_NAMES = void 0;
// コマンド関連の定数
exports.COMMAND_NAMES = {
    GENSHIN: 'genshin',
    CHARACTER: 'character',
    REGISTER: 'register-uid',
    MY_INFO: 'my-genshin',
    MY_CHARACTERS: 'my-characters',
    MY_CHARACTER: 'my-character',
    MY_ACCOUNTS: 'my-accounts',
    SWITCH_UID: 'switch-uid'
};
exports.COMMAND_DESCRIPTIONS = {
    GENSHIN: '原神のプレイヤー情報を取得します',
    CHARACTER: 'キャラクターの詳細情報を取得します',
    REGISTER: 'あなたのUIDを登録・更新します',
    MY_INFO: '登録済みのUIDで原神情報を表示します',
    MY_CHARACTERS: '保存されたキャラクター一覧を表示します',
    MY_CHARACTER: '保存されたキャラクターの詳細を表示します',
    MY_ACCOUNTS: '登録済みのアカウント一覧を表示します',
    SWITCH_UID: 'アクティブなUIDを切り替えます'
};
exports.OPTION_NAMES = {
    UID: 'uid',
    CHARACTER_ID: 'character_id',
    CHARACTER_NAME: 'character_name',
    NICKNAME: 'nickname'
};
exports.OPTION_DESCRIPTIONS = {
    UID: 'プレイヤーのUID',
    CHARACTER_ID: 'キャラクターID',
    CHARACTER_NAME: 'キャラクター名',
    NICKNAME: 'ニックネーム（オプション）'
};
//# sourceMappingURL=commands.js.map