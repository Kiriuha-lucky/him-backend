export default {
	routes: [
		{
			method: 'POST',
			path: '/telegram/auth',
			handler: 'telegram.auth',
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};
