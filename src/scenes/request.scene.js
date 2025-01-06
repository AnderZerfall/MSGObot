import { Scenes } from "telegraf";
import { bot, ADMIN } from '../bot.js';

export const requestScene = new Scenes.BaseScene('REQUEST_SCENE');

const enterCustomDialog = async (context) => {
    // context.session.adminId = context.from.id;

    // const customKeyboard = Markup.keyboard([
    //     [placeholder.endDialogButtonText]
    // ]);

    // await context.reply(`Your next messages will be sent directly to @${context.session.user.username}`, customKeyboard);
    // await bot.telegram.sendMessage( context.session.user.userId, placeholder.joinChatText('MSGO'));
    context.reply('Your messages will be sent to MSGO Admin directly');
    context.session.dialogActive = true;

    requestScene.on('message', async (userContext) => {
        await bot.telegram.sendMessage(ADMIN, `Message from: @${userContext.from.username}\n\n ${userContext.message.text}`);
    });
};

requestScene.enter(async (context) => {
    context.session.dialogActive = false;

    enterCustomDialog(context);
});

requestScene.leave(async (context) => {
    context.session.dialogActive = false;
});