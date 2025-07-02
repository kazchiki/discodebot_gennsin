import { Character } from '../types';
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
export declare function loadUserData(): Promise<UserData>;
export declare function saveUserData(userData: UserData): Promise<void>;
export declare function getUserUID(discordUserId: string): Promise<string | null>;
export declare function setUserUID(discordUserId: string, uid: string, nickname?: string): Promise<void>;
export declare function deleteUserData(discordUserId: string): Promise<boolean>;
export declare function saveUserCharacter(discordUserId: string, characterId: string, characterData: Character, characterName: string): Promise<void>;
export declare function getUserCharacters(discordUserId: string): Promise<{
    [characterId: string]: SavedCharacter;
} | null>;
export declare function getUserCharacter(discordUserId: string, characterId: string): Promise<SavedCharacter | null>;
export declare function deleteUserCharacter(discordUserId: string, characterId: string): Promise<boolean>;
export {};
//# sourceMappingURL=userData.d.ts.map