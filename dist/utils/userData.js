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
exports.getUserCharactersByUID = getUserCharactersByUID;
exports.getUserCharacter = getUserCharacter;
exports.deleteUserCharacter = deleteUserCharacter;
exports.getUserAccounts = getUserAccounts;
exports.switchActiveUID = switchActiveUID;
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
// ユーザーの現在のUIDを取得
async function getUserUID(discordUserId) {
    const userData = await loadUserData();
    return userData[discordUserId]?.currentUID || null;
}
// ユーザーのUIDを登録/更新
async function setUserUID(discordUserId, uid, nickname) {
    const userData = await loadUserData();
    if (!userData[discordUserId]) {
        userData[discordUserId] = {
            currentUID: uid,
            accounts: {}
        };
    }
    else {
        userData[discordUserId].currentUID = uid;
    }
    // アカウント情報を登録/更新
    userData[discordUserId].accounts[uid] = {
        nickname,
        lastUpdated: new Date().toISOString(),
        characters: userData[discordUserId].accounts[uid]?.characters || {}
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
async function saveUserCharacter(discordUserId, uid, characterId, characterData, characterName) {
    const userData = await loadUserData();
    if (!userData[discordUserId]) {
        throw new Error('ユーザーが登録されていません');
    }
    if (!userData[discordUserId].accounts[uid]) {
        throw new Error('指定されたUIDが登録されていません');
    }
    if (!userData[discordUserId].accounts[uid].characters) {
        userData[discordUserId].accounts[uid].characters = {};
    }
    userData[discordUserId].accounts[uid].characters[characterId] = {
        data: characterData,
        characterName,
        lastUpdated: new Date().toISOString()
    };
    await saveUserData(userData);
}
// ユーザーの保存されたキャラクター一覧を取得（現在のUIDのもの）
async function getUserCharacters(discordUserId) {
    const userData = await loadUserData();
    const currentUID = userData[discordUserId]?.currentUID;
    if (!currentUID)
        return null;
    return userData[discordUserId]?.accounts[currentUID]?.characters || null;
}
// 特定UIDのキャラクター一覧を取得
async function getUserCharactersByUID(discordUserId, uid) {
    const userData = await loadUserData();
    return userData[discordUserId]?.accounts[uid]?.characters || null;
}
// ユーザーの特定キャラクター情報を取得（現在のUIDのもの）
async function getUserCharacter(discordUserId, characterId) {
    const userData = await loadUserData();
    const currentUID = userData[discordUserId]?.currentUID;
    if (!currentUID)
        return null;
    return userData[discordUserId]?.accounts[currentUID]?.characters?.[characterId] || null;
}
// ユーザーの特定キャラクター情報を削除（現在のUIDのもの）
async function deleteUserCharacter(discordUserId, characterId) {
    const userData = await loadUserData();
    const currentUID = userData[discordUserId]?.currentUID;
    if (!currentUID)
        return false;
    if (userData[discordUserId]?.accounts[currentUID]?.characters?.[characterId]) {
        delete userData[discordUserId].accounts[currentUID].characters[characterId];
        await saveUserData(userData);
        return true;
    }
    return false;
}
// ユーザーのアカウント一覧を取得
async function getUserAccounts(discordUserId) {
    const userData = await loadUserData();
    return userData[discordUserId]?.accounts || null;
}
// アクティブUIDを切り替え
async function switchActiveUID(discordUserId, uid) {
    const userData = await loadUserData();
    if (!userData[discordUserId]?.accounts[uid]) {
        return false; // 指定されたUIDが存在しない
    }
    userData[discordUserId].currentUID = uid;
    await saveUserData(userData);
    return true;
}
//# sourceMappingURL=userData.js.map