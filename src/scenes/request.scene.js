import { Scenes } from "telegraf";
import { createTimer, proceed } from "../utils/timeout.js";
import { bot, ADMIN } from '../bot.js';

export const requestScene = new Scenes.BaseScene('REQUEST_SCENE');

const messageRequest = async (context) => {
    context.reply('Your messages will be sent to MSGO Admin directly');
    context.session.dialogActive = true;
};

requestScene.on('message', async (context) => {
    if (context.session.dialogActive) {
        proceed(async () => await bot.telegram.sendMessage(ADMIN, `Message from: @${context.from.username}\n\n ${context.message.text}`));
    }

    context.session.timeout = createTimer(context);
});

requestScene.enter(async (context) => {
    context.session.timeout = createTimer(context);
    context.session.dialogActive = false;

    messageRequest(context);
});

requestScene.leave(async (context) => {
    context.session.dialogActive = false;

    if (context.session?.timeout) {
        clearTimeout(context.session.timeout);
    }
});