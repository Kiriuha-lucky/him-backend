export default ({ env }) => {
	return [
		'strapi::logger',
		'strapi::errors',
		{
			name: 'strapi::security',
			config: {
				contentSecurityPolicy: {
					useDefaults: true,
					directives: {
						'connect-src': ["'self'", 'https:'],
						'script-src': [
							"'self'",
							'editor.unlayer.com',
							'https://editor.unlayer.com',
						],
						'frame-src': [
							"'self'",
							'editor.unlayer.com',
							'https://editor.unlayer.com',
						],
						'img-src': [
							"'self'",
							'data:',
							'blob:',
							'dl.airtable.com',
							'337acbc3-097fc636-c32e-4acd-ba2c-f619436e64d7.s3.timeweb.cloud',
							'cdn.jsdelivr.net',
							'strapi.io',
							's3.amazonaws.com',
						],
						'media-src': [
							"'self'",
							'data:',
							'blob:',
							'dl.airtable.com',
							'337acbc3-097fc636-c32e-4acd-ba2c-f619436e64d7.s3.timeweb.cloud',
						],
						upgradeInsecureRequests: null,
					},
				},
			},
		},
		{
			name: 'strapi::cors',
			config: {
				enabled: true,
				origin: env.array('ORIGINS'),
			},
		},
		'strapi::poweredBy',
		'strapi::query',
		{
			name: 'strapi::body',
			config: {
				formLimit: '10mb', // modify form body
				jsonLimit: '10mb', // modify JSON body
				textLimit: '10mb', // modify text body
				formidable: {
					maxFileSize: 20 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
				},
			},
		},
		'strapi::session',
		'strapi::favicon',
		'strapi::public',
	];
};
