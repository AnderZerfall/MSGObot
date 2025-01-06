import dotenv from 'dotenv';
import { ADMIN } from '../bot.js';
import { getUserByUsername } from '../utils/dbManager.js';
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
        const receiverId = await getUserByUsername(receiver);
        context.reply(`Next messages will be set to @${receiver}`);

        await context.scene.enter('DIALOG_SCENE', {
            userId: receiverId.userId,
            username: receiverId.username,
        });

    } catch (error) {
        console.log(`Request: ${error.message}`);
        context.reply(error.message);
    }
});