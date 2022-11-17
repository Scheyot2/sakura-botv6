import { AxiosRequestConfig } from 'axios';
/**
 * gets the session uid and frontaddr needed to play the game.
 * @param config the axios request config
 * @returns {Promise<{uid: string, frontaddr: string}>} the uid and frontaddr needed to start a game
 * @throws Error an error if the uid and frontaddr cannot be found
 */
export declare function getSession(config?: AxiosRequestConfig): Promise<{
    uid: string;
    frontaddr: string;
} | Error>;
