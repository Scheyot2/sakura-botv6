import { guess } from './functions';
import { region } from './constants/Client';
import { HttpsProxyAgentOptions } from 'https-proxy-agent';
import { configOptions } from './functions/Request';
interface AkinatorConstructor {
    region: region;
    childMode?: boolean;
    proxyOptions?: string | HttpsProxyAgentOptions;
}
declare const answers: readonly [0, 1, 2, 3, 4];
declare type answerID = (typeof answers)[number];
export default class Akinator {
    currentStep: number;
    region: region;
    uri: string | undefined;
    urlApiWs: string | undefined;
    uriObj: {
        uid: string;
        frontaddr: string;
    } | Error | undefined;
    noUri: string;
    noSession: string;
    session: string | undefined;
    progress: number;
    childMode: {
        childMod: boolean;
        softConstraint: string;
        questionFilter: string;
    };
    answers: ('Yes' | 'No' | 'Don\'t Know' | 'Probably' | 'Probably not')[] | guess[];
    uid: string | undefined;
    frontaddr: string | undefined;
    signature: string | undefined;
    question: string | undefined;
    challenge_auth: string | undefined;
    guessCount: number;
    config: configOptions;
    constructor({ region, childMode, proxyOptions }: AkinatorConstructor);
    /**
    * Starts the akinator session and game.
    */
    start(): Promise<void | Error>;
    /**
     * Gets the next question for the akinator session.
     * @param {answerID} answerID the answer to the question
     */
    step(answerID: answerID): Promise<void | Error>;
    /**
     * Reverts the game back a previous step.
     */
    back(): Promise<void | Error>;
    /**
     * The akinator attempts to make a guess and win the game.
     */
    win(): Promise<void | Error>;
}
export {};
