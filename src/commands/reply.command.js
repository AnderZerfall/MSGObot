import dotenv from 'dotenv';
import * as placeholder from '../api/placeholders.js';
import * as images from '../img/image.links.js';

dotenv.config();

export const replyCommand = (async (context) => {
    const sender = context.from.id;
    const receiver = context.message.text.split('@');

    context.reply(receiver);

    // if (sender === parseInt(process.env.ADMINS)) {
    //    await bot.telegram.sendMessage(context.session.user.userId, placeholder.leftChatText('MSGO'));
    // }

    // await context.replyWithPhoto(images.avatarImage,
    //     {
    //         caption: placeholder.greetingsText(context.from.username),
    //         parse_mode: 'HTML'
    //     });
});