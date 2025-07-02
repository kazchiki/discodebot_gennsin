"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUserData = loadUserData;
exports.saveUserData = saveUserData;
exports.getUserUID = getUserUID;
exports.setUserUID = setUserUID;
exports.deleteUserData = deleteUserData;
exports.saveUserCharacter = saveUserCharacter;
exports.getUserCharacters = getUserCharacters;
exports.getUserCharacter = getUserCharacter;
exports.deleteUserCharacter = deleteUserCharacter;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const USER_DATA_FILE = path_1.default.join(process.cwd(), 'userData.json');
// ユーザーデータを読み込み
async function loadUserData() {
    try {
        const data = await promises_1.default.readFile(USER_DATA_FILE, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        // ファイルが存在しない場合は空オブジェクトを返す
        return {};
    }
}
// ユーザーデータを保存
async function saveUserData(userData) {
    try {
        await promises_1.default.writeFile(USER_DATA_FILE, JSON.stringify(userData, null, 2), 'utf-8');
    }
    catch (error) {
        console.error('ユーザーデータの保存に失敗しました:', error);
        throw error;
    }
}
// ユーザーのUIDを取得
async function getUserUID(discordUserId) {
    const userData = await loadUserData();
    return userData[discordUserId]?.uid || null;
}
// ユーザーのUIDを登録/更新
async function setUserUID(discordUserId, uid, nickname) {
    const userData = await loadUserData();
    userData[discordUserId] = {
        uid,
        nickname,
        lastUpdated: new Date().toISOString()
    };
    await saveUserData(userData);
}
// ユーザーのデータを削除
async function deleteUserData(discordUserId) {
    const userData = await loadUserData();
    if (userData[discordUserId]) {
        delete userData[discordUserId];
        await saveUserData(userData);
        return true;
    }
    return false;
}
// ユーザーのキャラクター情報を保存
async function saveUserCharacter(discordUserId, characterId, characterData, characterName) {
    const userData = await loadUserData();
    if (!userData[discordUserId]) {
        throw new Error('ユーザーが登録されていません');
    }
    if (!userData[discordUserId].characters) {
        userData[discordUserId].characters = {};
    }
    userData[discordUserId].characters[characterId] = {
        data: characterData,
        characterName,
        lastUpdated: new Date().toISOString()
    };
    await saveUserData(userData);
}
// ユーザーの保存されたキャラクター一覧を取得
async function getUserCharacters(discordUserId) {
    const userData = await loadUserData();
    return userData[discordUserId]?.characters || null;
}
// ユーザーの特定キャラクター情報を取得
async function getUserCharacter(discordUserId, characterId) {
    const userData = await loadUserData();
    return userData[discordUserId]?.characters?.[characterId] || null;
}
// ユーザーの特定キャラクター情報を削除
async function deleteUserCharacter(discordUserId, characterId) {
    const userData = await loadUserData();
    if (userData[discordUserId]?.characters?.[characterId]) {
        delete userData[discordUserId].characters[characterId];
        await saveUserData(userData);
        return true;
    }
    return false;
}
//# sourceMappingURL=userData.js.map