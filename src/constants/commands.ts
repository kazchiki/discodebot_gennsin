// コマンド関連の定数
export const COMMAND_NAMES = {
    GENSHIN: 'genshin',
    CHARACTER: 'character',
    REGISTER: 'register-uid',
    MY_INFO: 'my-genshin',
    MY_CHARACTERS: 'my-characters',
    MY_CHARACTER: 'my-character'
} as const;

export const COMMAND_DESCRIPTIONS = {
    GENSHIN: '原神のプレイヤー情報を取得します',
    CHARACTER: 'キャラクターの詳細情報を取得します',
    REGISTER: 'あなたのUIDを登録・更新します',
    MY_INFO: '登録済みのUIDで原神情報を表示します',
    MY_CHARACTERS: '保存されたキャラクター一覧を表示します',
    MY_CHARACTER: '保存されたキャラクターの詳細を表示します'
} as const;

export const OPTION_NAMES = {
    UID: 'uid',
    CHARACTER_ID: 'character_id',
    CHARACTER_NAME: 'character_name'
} as const;

export const OPTION_DESCRIPTIONS = {
    UID: 'プレイヤーのUID',
    CHARACTER_ID: 'キャラクターID',
    CHARACTER_NAME: 'キャラクター名'
} as const; 