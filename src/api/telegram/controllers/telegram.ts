/**
 * A set of functions called "actions" for `telegram`
 */
import { verifyTelegramData } from '../../../telegram/telegram-bot';

export default {
	auth: async (ctx, next) => {
		console.log(ctx?.request?.body);

		console.log(verifyTelegramData(ctx?.request?.body));
	},
};
