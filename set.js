const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUwyaDhzVURTUnRJTmNhamd6Uzg5Vi9QSDA0dXd3SE1KTGg4OWsvc0dHMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ2h6Wm9iS0hqVDVqeEFHa1VCWWx2MUpZS0hZSVMzT3ErUlZVbXpFTjBoUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjT1ZmV053UExONm5DRFJuVlJjbFV2Tjg3UW93KytqdW1sY3RqeDlKMzNNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHNG1Nd1FZUnNkcUx6eU10WTJRZHlXRWxDUHJKdE9lcDFTd1lJRnIyeDBnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFPZ2pLYW4rT1Z2aStUN1NWNHpRak5KSmhvOGRmcE5HVFRpcG82enZKRnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZVSlZZNzVxNUJsR3pVUXQ3SnJwbno1V2t0dm9uY3hrbjk4OXRSRnVhVTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ01MejVsWEI2azdjWFUwS21qcWpickJUUXEwblV0azVQejNiSjVYZUdtND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkZVd254N3p6NEFTU3BlalU1MDA0RHRPcUpaQlg1Slh2OXlmR29MTm5VTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inc5V2QyWWtvRzNibUpSczNVcXdPNkRTQ2U0QnFXcXc4ejVGTkNQS3BxbDl5Z3hFeGIxa1VXZjhEanZOS2Z5L2t4UVpqbzY2VjZKUXR1OGJHbHFUR2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDgsImFkdlNlY3JldEtleSI6IklsWXFvbUl5cXFaUWsraXREOGJvOE1lTlFyTHRDRXk5enJjdWF6Sys3ZWs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImFhREU5V2RpVC1PY2dRWTREUnNnZ1EiLCJwaG9uZUlkIjoiNGZiY2RhN2QtZDkzZC00MTRiLWFmYzQtMDIzNzgwMWMyOGViIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpDclhvZHVKelpMVnIyTGZFbmZ1YWE3VzdvYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxamZtOC8ydUhqTDFkY1VXZFlMRmNWOWZENWM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRzVLOFZEMlQiLCJtZSI6eyJpZCI6IjI1NDcwMjM1MTY1Nzo3NkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTzZiZ1o4SEVNM3VpclVHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSDNBeEtpektwZ3ZxaGowcXozU0ZZekdyOWtKT09QYmdFb1VWUXlWdmNVUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYTdoQ0FiM01TQ3lnMFJTUkpEcmpSZFFwTjdicDRObDYzL1BWaG5nemVXeXczL3JHSkFIMURFWGhnRmlDeElZcFdhOG9RWlA5R3lENWhkSGRSOVQ4QWc9PSIsImRldmljZVNpZ25hdHVyZSI6IlhLNVpDSmI5aUdSaGJudldWUWFacEtBcTZyeUYxRFRYeUJ3YjJCRkRzZHV2cnJNWG5Qb0Y0OE92NGk5UkE5ZkdsY052dDkwTUFlMUFYemNrang4UWh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzAyMzUxNjU3Ojc2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlI5d01Tb3N5cVlMNm9ZOUtzOTBoV014cS9aQ1RqajI0QktGRlVNbGIzRkUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE5Mzk4MDMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT0hyIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254702351657",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
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
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
