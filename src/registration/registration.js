import { Scenes, session } from 'telegraf';
import { bot } from '../bot.js';
import { applicationScene } from "../scenes/apply.scene.js";
import { reviewScene } from "../scenes/review.scene.js";
import { dialogScene } from "../scenes/dialog.scene.js";
import { startCommand } from '../commands/start.command.js';
import { helpCommand } from '../commands/help.command.js';
import { adminScene } from '../scenes/admin.scene.js';
import { userScene } from '../scenes/user.scene.js';

const scenes = [
    applicationScene,
    reviewScene,
    dialogScene,
    adminScene,
    userScene
]

export const registerActions = () => {
    // register scenes
    const stage = new Scenes.Stage(scenes);
    bot.use(session());
    bot.use(stage.middleware());

    bot.start(startCommand);
    bot.help(helpCommand);
    bot.command('menu', startCommand);
}
