"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = void 0;
const axios_1 = require("axios");
const Client_1 = require("../constants/Client");
const sessionError = new Error(`Cannot find the uid and frontaddr. Please report to the github at: ${Client_1.issues}`);
/**
 * gets the session uid and frontaddr needed to play the game.
 * @param config the axios request config
 * @returns {Promise<{uid: string, frontaddr: string}>} the uid and frontaddr needed to start a game
 * @throws Error an error if the uid and frontaddr cannot be found
 */
async function getSession(config) {
    var _a, _b;
    const { data } = await axios_1.default.get('https://en.akinator.com/game', config).catch(() => ({ data: null }));
    if (!(data === null || data === void 0 ? void 0 : data.match(Client_1.patternSession))) {
        throw sessionError;
    }
    // use pattern matching to get the uid and frontaddr. It looks like:
    // var uid_ext_session = 'a7560672-6944-11e9-bbad-0cc47a40ef18';
    // var frontaddr = 'NDYuMTA1LjExMC40NQ==';
    const uid = (_a = Client_1.patternSession.exec(data)) === null || _a === void 0 ? void 0 : _a[1];
    const frontaddr = (_b = Client_1.patternSession.exec(data)) === null || _b === void 0 ? void 0 : _b[2];
    if (!uid || !frontaddr) {
        throw sessionError;
    }
    return { uid, frontaddr };
}
exports.getSession = getSession;
//# sourceMappingURL=GetSession.js.map