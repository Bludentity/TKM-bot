const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ05yTGhmbC9UNlRMenhvOG5OUVVIZzFQbXBWdm9zUTRjZmxkSmF6ZG1Waz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDZrbEhidFBtQ3o0WlZERDhPM3plUHlnaUU1RjVrSWo5NVV4UWdxRkwwND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNT3hRUnFnc2MzdVYvcFl1ejRMbDZjTGZrYzdkeUNHNkNORlpFdUJxQzBJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0Qk12dmtjb3Z5SC9nYk1FOXVYdExyVlVnbTVzMk53cWxnNTdlOVBuRVRvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBQclFHN29MSXBCcWZQUU5hU3ZzWk9nbkYvVEhoTjlKbGdYQlVSc1BGMEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlB5ZHR0WEpydmx2YnVtWHQzdW5uQzlkVVMxOUFsYjByTTZQKzdSbkRaMGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0NXUnR6WTFORjRPbm1vN1FzbDZYNGJQdXZrU21HNXU4WGlRRGZWSHRIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblBGYkNTbXcwWTltVE5Nd05SUXlWNmlWc0V0RDNQSlpQaWhaai81WTRDTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1JZUY1S2ExRG1iWUltWlJub25JaitoY0oycHpkbDVoajZZclVURmNtRUIyUC9DYlhOdFV0elA3RHRtQzZadkExSWlMK2M2bVQ5Nk4xWWNXY2EvOWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJ0R2dKellrczBmZWNDdXJBSTd1VWd5L1hGakMwWklYYUJPNkl6VERubkpzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJkRVRyTk5iblQ4cVNYUWt6Q28wQTlnIiwicGhvbmVJZCI6IjViMTVhOWFjLTU5ZDctNGQ4Yy05MWM5LTAyYjFlZDZiZGVkZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSi81UDJvZ0U5T3p6KzhFOERibDdCUFA2bVU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVVWbjBQdVdpVE1uNW4xUjY5TXpxRVN6c1VFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZZUU5BWEI4IiwibWUiOnsiaWQiOiIyNTQ3MDIzNTE2NTc6NzRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ082YmdaOEhFTlRZaWJVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkgzQXhLaXpLcGd2cWhqMHF6M1NGWXpHcjlrSk9PUGJnRW9VVlF5VnZjVVE9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImhzMzNpb0lvWUU3NDBtVjM2cVE2dTNZUlQ3cnF1NEQrTk1mblBjMUdhNmtUdTVMTXRQQ1dvK2o0OGQ2UkF1eFNSOHJId1RqTXAwVVRrWGtwVjJyZkNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0QngvR1g5R01vSXRyQnNBdkkvMkUvcVk1aTNaZjlHaytyUUFneEFlSGJ0U29nOG1ubVBhQ3NZSTFZaHZKYXlCVDBFSTRsNzFId1FOOXNMTlArZXhpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcwMjM1MTY1Nzo3NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSOXdNU29zeXFZTDZvWTlLczkwaFdNeHEvWkNUamoyNEJLRkZVTWxiM0ZFIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxOTIwNjA5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9IciJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
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
