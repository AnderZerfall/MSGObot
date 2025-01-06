import { Markup, Scenes } from "telegraf";
import { questions } from "../api/application.js";
import { saveApplication } from "../utils/dbManager.js";
import { createTimer, proceed } from "../utils/timeout.js";
import { createApplication } from "../utils/createApplication.js";
import * as placeholder from "../api/placeholders.js";
import * as images from '../img/image.links.js';

export const applicationScene = new Scenes.BaseScene("APPLICATION_SCENE");

applicationScene.enter(async (context) => {
  context.session.timeout = createTimer(context);
  context.session.currentQuestion = 0;
  context.session.answers = [];

  await context.replyWithPhoto(images.titleImage,
    {
        caption: placeholder.joinTeamText,
        parse_mode: 'HTML'
    });

  context.session.answers[context.session.currentQuestion] = {
    question: await askQuestion(0, context),
    answer: '',
  }
});

const saveAnswer = async (context, answer) => {
  try {
    if (context.session.answers[context.session.currentQuestion].question.check) {
      try {
        context.session.answers[context.session.currentQuestion].question.check(answer);
      } catch (error) {
        throw new Error(error.message);
      }
    }

    context.session.answers[context.session.currentQuestion] = {
      ...context.session.answers[context.session.currentQuestion],
      answer,
    };

    context.session.currentQuestion++;

    if (context.session.currentQuestion < questions.length) {
      context.session.answers[context.session.currentQuestion] = {
        question: await askQuestion(context.session.currentQuestion, context),
        answer: '',
      };
    } else {
      await sendApplication(context.session.answers, context);
    }
  } catch (error) {
    await context.reply(`${placeholder.errorText}: ${error.message}`);
  }
};

applicationScene.on('message', proceed(async (context) => {
  const answer = context.message.text;
  await saveAnswer(context, answer);
}));

applicationScene.on('callback_query', proceed(async (context) => {
  const answer = context.callbackQuery.data;
  await saveAnswer(context, answer);
  await context.answerCbQuery();
  await context.editMessageReplyMarkup();
}));

const askQuestion = async (currentQuestion, context) => {
  if (currentQuestion < questions.length) {
    const question = questions[currentQuestion];

    if (question.options) {
      const keyboard = Markup.inlineKeyboard(
        question.options.map((option) => [Markup.button.callback(option, option)])
      );

      await context.reply(question.text, keyboard);
      console.log(question);
    } else {
      await context.reply(question.text);
    }

    return question;
  } else {
    throw new Error("The index of the questions doesn`t exist");
  }
};

const sendApplication = async (answers, context) => {
  try {
    let textMessage = placeholder.applicationHeader(context.from.username);

    answers.forEach((answer) => {
      textMessage +=
          `${answer.question.text}:\n  ${answer.answer}\n\n`;
    });

    if (textMessage) {
      const user = { userId: context.from.id, username: context.from.username };
      await saveApplication(context, textMessage, new Date());
      await createApplication(user, textMessage);
    }

    await context.reply(placeholder.thankYouText);
  } catch(error) {
    await context.reply(`${placeholder.errorText}: ${error.message}`);
    console.log(error.message);
  }

  return context.scene.enter('USER_SCENE');
};

applicationScene.leave((context) => {
  if (context.session?.timeout) {
    clearTimeout(context.session.timeout);
  }

  context.session.currentQuestion = null;
  context.session.answers = null;
});