// Welcome

export const greetingsText = (username) =>`<b>Привет ${username && '@' + username}! Я бот сообщества MSGO.</b>`;

// Help placeholder

export const helpText = (role) =>
                        `<b>Список команд:</b>
                        
                        <i>/start - Запуск бота или выход в главное меню</i>
                        <i>/help - показать список комманд</i>

                        <b>Список функций:</b>

                        ${role === 'admin' ?
                        
                        `<i>Просмотр заявок - вы можете просмотреть все заявки за определённый период и дать на них ответ.
                        Получение заявок в режиме реального времени - успейте ответить на свежую заявку сразу!
                        Рассылка - отправка сообщения всем пользователям, подписаных на бота</i>`

                        :

                        `<i>Подача заявки - быстрый и лёгкий способ отправить заявку.
                        Сопровождаеться сбором основных данных
                        FAQ - список часто задаваемых вопросов с ответами на них. Вся важная информация здесь!</i>`

                        }
                        
                        <b>Есть вопросы? Свяжитесь с @fukuro_dz</b>`;

// Error placeholder

export const errorText = `Произошла ошибка. Попробуйте позже или обратитесь к администратору @fukuro_dz`;

// User scene placeholder

export const userSceneText = (username) => `Чем могу помочь ${username && '@' +  username}?`;
export const applyButtonText = `Вступление в команду`;
export const partnershipButtonText = `Партнёрство`;
export const FAQButtonText = `FAQ`;

// Admin scene placeholder

export const adminSceneText = (username) => `Что прикажкте делать ${username && '@' + username}?`;
export const reviewButtonText = `Просмотреть недавние запросы`;

// Application example placeholder

export const applicationHeader = (username) => `Заявка на вступление от ${username ? '@' + username : 'анонимного пользователя'}\n\n`; 

// Apply for the team placeholder

export const joinTeamText = `<b>Хочешь присоединиться к команде? Тогда давай начнём!</b>

Чтобы вступить в нашу комнаду, тебе следует пройти 3 этапа: <i>подача заявки, тестовое задание и собеседование</i>.

Подача заявки происходит здесь, тестовое и собеседование - а ПП.
После успешного прохождения всех этапов, ты станеть частью нашей команды!`;

export const thankYouText = `
Спасибо!
Заявка была отправлено успешно.
В течении 3 дней вы получите автоматический ответ или с вами свяжеться менеджер для уточнения деталей`;


// Applications placeholders

export const waitText = `Ожидайте, в скором времени вы получите ответ.
Спасибо за терпение.`;

export const approve2Text = `Спасибо за ожидание, мы рассмотрели вашу анкету и готовы пригласить вас на второй этап вступления в команду!
Вам необходимо выполнить тестовое задание, чтобы перейти на финальный этап.

Дайте нам знать, если вы готовы взяться за это :)`;

export const approve3Text = `Спасибо за ожидание!
Мы приглашаем вас на третий этап вступления в команду — собеседование.

Сообщите когда вам удобно будет связаться в дискорде.`;

export const requestExamplesText = `Здравствуйте! Пришлите примеры ваших работ.`;

export const rejectRelevantText = `К большому сожалению, мы вынуждены вам отказать.
Большое спасибо за выбор нашей студии, но на данный момент, мы не готовы принять вас в состав команды.

До скорых встреч!`;

export const rejectExamplesText = `Без примеров ваших работ мы не
можем рассмотреть вашу кандидатуру на вступление в команду.

Возвращайтесь когда пополните своё портфолио, мы будем ждать вас здесь!`;

export const warnText = `Сообщения в виде спама, рекламы или не по делу не будут рассматриваться!
Просим вас уважительно относится к поддержке и писать только по делу.

В противном случае, вы будете занесены в черный список.
Спасибо за понимание.`;

// FAQ text

export const aboutButtonText = `Про МСГО`;
export const toolsButtonText = `Про инструментарий`; 
export const aboutBotButtonText = `Про бота`;

export const FAQText = `MSGO FAQ`;

export const toolsFAQText = `Для создание наших сериалов мы используем модификацию для Minecraft от McHorce, которая есть в свободном доступе.
Если вы хотите узнать, как же мы создаем анимацию персонажей, то ознакомьтесь с данной модификацией — https://www.youtube.com/c/McHorsesmods/videos`;

export const aboutFAQText = `MSGO - это сообщество, которое создает анимационные сериалы на основе игры Minecraft.`;

export const aboutBotFAQText = `Developed by @fukuro_dz for MSGO Creation team.`;

// Dialog scene placeholder

export const leftChatText = (username) => `${username ? username : 'Пользователь'} покинули чат.
Диалог завершён и ваши сообщения не будут отправлены.`;

export const joinChatText = (username) => `${username ? username : 'Пользователь'} присоединился к чату.
Следующие сообщения будут отправлены этому пользователю.`;

export const endDialogButtonText = `Закончить диалог`;

export const approve2ButtonText = `Подтвердить на 2 этап`;
export const approve3ButtonText = `Подтвердить на 3 этап`;
export const waitButtonText = `Попросить подождать`;
export const rejectButtonText = `Отказать указав причину`;
export const noExamplesButtonText = `Нет примеров`;
export const notRelevantButtonText = `Нет примеров`;
export const requestButtonText = `Запросить примеров`;
export const warnButtonText = `Предупредить`;
export const customButtonText = `Написать кастомное сообщение`;
