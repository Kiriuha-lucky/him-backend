export default ({ env }) => ({
	upload: {
		config: {
			provider: 'aws-s3',
			providerOptions: {
				credentials: {
					accessKeyId: env('AWS_ACCESS_KEY_ID'),
					secretAccessKey: env('AWS_ACCESS_SECRET'),
				},
				region: env('AWS_REGION'),
				params: {
					ACL: 'private',
					signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
					Bucket: env('AWS_BUCKET'),
				},
				endpoint: env('AWS_BUCKET_URL'),
			},
			actionOptions: {
				upload: {},
				uploadStream: {},
				delete: {},
			},
		},
	},
});
