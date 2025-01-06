import { Scenes} from 'telegraf';
import { getApplications } from "../utils/dbManager.js";
import { createApplication } from "../utils/createApplication.js";

export const reviewScene = new Scenes.BaseScene('REVIEW_APPLICATIONS_SCENE');

reviewScene.enter(async (context) => {
    await context.reply('Here is the most recent applications');

    const users = await getApplications();
    console.log(users);

    for (const user of users) {
        const query = user.query;
        await createApplication(user, query);
    }
});