import dotenv from 'dotenv';
import { bot, ADMIN } from '../bot.js';
import * as placeholder from '../api/placeholders.js';
import * as images from '../img/image.links.js';

dotenv.config();

export const replyCommand = (async (context) => {
    try {
        const senderId = context.from.id;

        if (senderId !== ADMIN) {
            throw new Error('You cannot use this command');
        }

        const receiver = context.message.text.split('@')[1];
        const receiverId = await bot.telegram.getChat(`@${receiver}`);

        await context.reply(`Next messages will be set to ${receiver}`);

        await context.scene.enter('DIALOG_SCENE', {
            userId: receiverId,
            username: `@${receiver}`,
        });
    } catch (error) {
        console.log(error.message);
        await context.reply(error.message);
    }

    // if (sender === parseInt(process.env.ADMINS)) {
    //    await bot.telegram.sendMessage(context.session.user.userId, placeholder.leftChatText('MSGO'));
    // }

    // await context.replyWithPhoto(images.avatarImage,
    //     {
    //         caption: placeholder.greetingsText(context.from.username),
    //         parse_mode: 'HTML'
    //     });
});