const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ZldFhnU3l3bnp4SkViazVEbmFJUWFhRkpOeDhSVHFpVWFvMVliUmVWcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM29yc3ZybW1kT0ZBZk13amVwYnNhSVhSZkl3SVM2cit2WTRqMStKWmVuRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQmdnS2NyVzhGaHNVS1J1RjZTcXY3RExnWFAvK1JkL3Y3NDBTMjFGc1ZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpWjF0V1MzNnZXVXhRUWI2a2d5b3ZsVTRDUnRBR2JTTWxsY0M2OUNsSEQ0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNFRmsweFBoSW11UUcrZU9kSEFvM2RqbGJUWTR3eXFzdWNwWXdlTzhwV289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFnMTJVaURUdEM1NkIrREh4aTZRZ25kdFZRdCtJQ09ncnNuOEZMOVFFWHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUpoYUl5YzE0eXlYTnI2WlpMZTBWaU9JNTBzdHRLUkE5RndwV1hpRGkzdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTVNS21VSkJxeDBkeFNOMVo5TVVEdnFaL2JYTjA3N1FiMlkyZFRpaUpRdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQvTnhtNUNrRmpkZ1pPOW5yRDRod3cxZWRicUpJZkl6NFd2ODFDbzJ4ZVp4TEJqZys3SXpzdnBJck9RQXFyNmhVTGpQN2FrcTZHZCtVai9jM25QL2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU5LCJhZHZTZWNyZXRLZXkiOiI1aUlRYmJXYjk3dE1xeEpPM2E1bGxHN0FQK1AxZUw1QVFvYlM1cVB5L0pRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTMxOTcyNDE3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhFRUQ5NzhENkIyODM0OTM2NjVFMDdBN0E5QTExQTQyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk1NDU4OTN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImRRUDJoYU9CU2tlMXFYQmFqcEx4RGciLCJwaG9uZUlkIjoiOGQ1OWQxODQtMTBiYi00NTQzLTllN2ItMjM1YzRhYTc5Nzc3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZkYm5QSmV1cFBnOElIVXhreHl5eGxDVkl6UT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmL3pzdnVFb3N6RHB4ZXB5b01tWGlTby9MZjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWjlHRjZRVzgiLCJtZSI6eyJpZCI6IjUwOTMxOTcyNDE3OjMzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJN1Y5Tm9GRUphTjI3Z0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJmMlJZOTA3M0JmNVRRSzBsYldhWXdwdEpKOUY4c2pGdzlsUUd5Rm9YSTJvPSIsImFjY291bnRTaWduYXR1cmUiOiJuVENvajBtb1FFbktNUGtmVE52QjVvTzVTb2I2a1dSZW9mMkR6ZmQxR1lnT0I2S2FrSU5ob25EbEVQZUZ0M1Zab2JOaENHaFd4UFF1Q3JEUmprUjhEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZ2x4cURqZXVFSHhHNjl5YjA5KzhiY3dXK0ZzVWVhMWhmMU95VDdwV2NtY2VMeG9vdlNudUw4MFhzUmo5RlU2VEJhcnlYQnhYRDJnQ0RZMUpFaHJkaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDkzMTk3MjQxNzozM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYOWtXUGRPOXdYK1UwQ3RKVzFtbU1LYlNTZlJmTEl4Y1BaVUJzaGFGeU5xIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5NTQ1ODkwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9FWiJ9',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "×͜͡𒋲⍣⃝𝐃𝚵𝚭𝚯𝐃†𝐒𝚻𝚰𝐅𝐋𝚵𝚪—͟͟͞͞𖣘",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "50931972417",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
