import { Markup, Scenes } from "telegraf";
import { createTimer, proceed } from "../utils/timeout.js";
import * as placeholder from "../api/placeholders.js";
    
export const userScene = new Scenes.BaseScene('USER_SCENE');

userScene.action('apply', proceed(async (context) => {
    await context.answerCbQuery();
    await context.scene.enter("APPLICATION_SCENE")
}));
userScene.action('partnership', proceed(async (context) => {
    await context.answerCbQuery();
    await context.reply(placeholder.errorText)
}));
userScene.action('faq', proceed(async (context) => {
    await context.answerCbQuery();
    await context.scene.enter("FAQ_SCENE")
}));

userScene.action('request', proceed(async (context) => {
    await context.answerCbQuery();
    await context.scene.enter("REQUEST_SCENE")
}));
    
userScene.enter(async (context) => {
    context.session.timeout = createTimer(context);
    
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(placeholder.applyButtonText, "apply")],
        [Markup.button.callback(placeholder.partnershipButtonText, "partnership")],
        [Markup.button.callback(placeholder.FAQButtonText, "faq")],
        [Markup.button.callback(placeholder.RequestButtonText, "request")],
    ])
        
    await context.reply(placeholder.userSceneText(context.from.username), keyboard);
});

userScene.leave((context) => {
    if (context.session?.timeout) {
        clearTimeout(context.session.timeout);
    }
});