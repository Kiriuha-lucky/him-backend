export default ({ env }) => ({
	upload: {
		config: {
			provider: 'aws-s3',
			providerOptions: {
				accessKeyId: env('AWS_ACCESS_KEY_ID'),
				secretAccessKey: env('AWS_ACCESS_SECRET'),
				region: env('AWS_REGION'),
				endpoint: env('AWS_BUCKET_URL'),
				params: {
					Bucket: env('AWS_BUCKET'),
				},
				sizeLimit: 20 * 1024 * 1024,
			},
			actionOptions: {
				get: {},
				upload: {},
				uploadStream: {},
				delete: {},
			},
		},
	},
});
