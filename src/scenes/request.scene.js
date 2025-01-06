import { Scenes } from "telegraf";
import { bot, ADMIN } from '../bot.js';

export const requestScene = new Scenes.BaseScene('REQUEST_SCENE');

requestScene.on('message', async (context) => {
    if (context.session.dialogActive) {
        await bot.telegram.sendMessage(ADMIN,
            `Message from: @${context.from.username}\n\n ${context.message.text}`);
    }
});

requestScene.enter(async (context) => {
    context.session.dialogActive = true;
    context.reply('Your messages will be sent to MSGO Admin directly');
});

requestScene.leave(async (context) => {
    context.session.dialogActive = false;
});