/**
 * A set of functions called "actions" for `telegram`
 */

export default {
	auth: async (ctx, next) => {
		console.log(JSON.parse(ctx?.request?.body));
	},
};
