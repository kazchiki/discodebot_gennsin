import fs from 'fs/promises';
import path from 'path';
import { Character } from '../types';

// ユーザーデータの型定義
interface SavedCharacter {
    data: Character;
    characterName: string;
    lastUpdated: string;
}

interface UserData {
    [discordUserId: string]: {
        uid: string;
        nickname?: string;
        lastUpdated: string;
        characters?: {
            [characterId: string]: SavedCharacter;
        };
    };
}

const USER_DATA_FILE = path.join(process.cwd(), 'userData.json');

// ユーザーデータを読み込み
export async function loadUserData(): Promise<UserData> {
    try {
        const data = await fs.readFile(USER_DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // ファイルが存在しない場合は空オブジェクトを返す
        return {};
    }
}

// ユーザーデータを保存
export async function saveUserData(userData: UserData): Promise<void> {
    try {
        await fs.writeFile(USER_DATA_FILE, JSON.stringify(userData, null, 2), 'utf-8');
    } catch (error) {
        console.error('ユーザーデータの保存に失敗しました:', error);
        throw error;
    }
}

// ユーザーのUIDを取得
export async function getUserUID(discordUserId: string): Promise<string | null> {
    const userData = await loadUserData();
    return userData[discordUserId]?.uid || null;
}

// ユーザーのUIDを登録/更新
export async function setUserUID(discordUserId: string, uid: string, nickname?: string): Promise<void> {
    const userData = await loadUserData();
    
    userData[discordUserId] = {
        uid,
        nickname,
        lastUpdated: new Date().toISOString()
    };
    
    await saveUserData(userData);
}

// ユーザーのデータを削除
export async function deleteUserData(discordUserId: string): Promise<boolean> {
    const userData = await loadUserData();
    
    if (userData[discordUserId]) {
        delete userData[discordUserId];
        await saveUserData(userData);
        return true;
    }
    
    return false;
}

// ユーザーのキャラクター情報を保存
export async function saveUserCharacter(
    discordUserId: string, 
    characterId: string, 
    characterData: Character, 
    characterName: string
): Promise<void> {
    const userData = await loadUserData();
    
    if (!userData[discordUserId]) {
        throw new Error('ユーザーが登録されていません');
    }
    
    if (!userData[discordUserId].characters) {
        userData[discordUserId].characters = {};
    }
    
    userData[discordUserId].characters![characterId] = {
        data: characterData,
        characterName,
        lastUpdated: new Date().toISOString()
    };
    
    await saveUserData(userData);
}

// ユーザーの保存されたキャラクター一覧を取得
export async function getUserCharacters(discordUserId: string): Promise<{ [characterId: string]: SavedCharacter } | null> {
    const userData = await loadUserData();
    return userData[discordUserId]?.characters || null;
}

// ユーザーの特定キャラクター情報を取得
export async function getUserCharacter(discordUserId: string, characterId: string): Promise<SavedCharacter | null> {
    const userData = await loadUserData();
    return userData[discordUserId]?.characters?.[characterId] || null;
}

// ユーザーの特定キャラクター情報を削除
export async function deleteUserCharacter(discordUserId: string, characterId: string): Promise<boolean> {
    const userData = await loadUserData();
    
    if (userData[discordUserId]?.characters?.[characterId]) {
        delete userData[discordUserId].characters![characterId];
        await saveUserData(userData);
        return true;
    }
    
    return false;
} 