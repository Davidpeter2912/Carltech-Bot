








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0xHLzRNYmtiS0xmRnE1RnVoZTRhN1oybFpLQmxjOVIzWXIzWFlUSUQwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEZjOUdBcERMMlNBNS9qL2Z4aDNyN0dmb01qNUhRc3FZelpmUjdtOHpqcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHT2hONnhhQW5GUDUxUy9YS3lSUGRwSm8vbUROUVNxR2dTTFNMNTBRY0hFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMT0hRdGdKY1NYZ3U1aG92L3Nkb3ZGKzZ5M3BOVVZMQWdSZ2F3K0VzVUE4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1Kc1Y0WE5NS3BRdmIxREVFcHpVazB1WDdOaEdRMVZvd2s5NGxMSVdjV1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhackhjSisrWDdPVjlNYmp3V3NSNEk1Q3lMUDQ2UDR4UzE3MWtEalJpeTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0VnM296NGlTT2xtcVRoUTY4dTFsNmJXMjRQck5mdGw0ZnRURHpVVGNuaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXV3WW5yOTlhRFBqUzB0RG51MmFVbzFOWGdibGFmb2RNTi9zTllJUXJ3WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdKNWc1M2VVTXlwK2R4d09vNlVGQU42c1B3RVlnSTRBMDVLVHZuRWYxaWRmbW9NbWJielkwelo4MnNkaENLYm5zbnNCQ3Z0Z0xOcnFrdmFSbjlZdEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY0LCJhZHZTZWNyZXRLZXkiOiI1YXpyeUF1c2RrbXpZVlhoSVg1dVQ4cW5Pd01jS1dUem5tYVlvMU83eTFRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5MjkxNjU2OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyRkI1OUM4OEMxOUFBOTg3NzVGMUE5MzkyQkZFRTgxRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ0NTM1ODExfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3OTI5MTY1NjhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzM4RkY4MDdFOTVBODIwMzNCRUI2NkE5RjcxRkNFMDUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NDUzNTgxNn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiSHMzX2lXcWhRT0d0YjA1Z3RicmZYUSIsInBob25lSWQiOiI4ZDUyMThhMy1lNmFjLTRlYzEtODc2Yi0wZTZiMDYwYWY2YjUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidFhnbldrTlM4OW1wV3Y1R1BOZmU5NXJRdXJJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJKaS9PS3h1a3hjVStNL1hjeWQrSEtPUnNwST0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiIxNTVNMks5RyIsIm1lIjp7ImlkIjoiMjU0NzkyOTE2NTY4OjExQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCfqbhN4oiGfE7iiIbwn6m4WU7im70ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09HVHlad0ZFT1NCN3I4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik9ndFA0R09Yb0hndUw5bW5CQUcvTHQycStCSmswWE0zYi81ekdFTnBYaVE9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImdEZVJBK3NDWncyd0IzMCtPR1F1clcvM1N1WGVtMFlxZmtWWjVRNVZaMFdhTkJ0ZTJjNVRqZll5aDFCZFR6dVRweCsrL2xUTmVHZm1QRVQvZXJ3b0R3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSdjczU2dMUXJEZEJHdGMzNmZmdW5iK3JzRlVWcDd4N2VwVVc4NTRaaGJTQ0JYVE5KTUNIVDRjaC84UVNVeEJWd2E2azFJc0N0enZwbTVrWi8vVC9DQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5MjkxNjU2ODoxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUb0xUK0JqbDZCNExpL1pwd1FCdnk3ZHF2Z1NaTkZ6TjIvK2N4aERhVjRrIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ0NTM1NzkzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJpTSJ9',
    PREFIXE: process.env.PREFIX || "davis peter",
    OWNER_NAME: process.env.OWNER_NAME || "davis peter",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "davis peter",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SPARK-X-2025',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/h2ydge.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    CHATBO : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    ANTI_CALL : process.env.ANTI_CALL || 'yes',
                  MENUTYPE : process.env.MENUTYPE || '',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_SAVE_CONTACTS_NAME: "SPARK-X", // Default name prefix for new contacts
                  AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
