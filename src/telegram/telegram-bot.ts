import { env } from '@strapi/utils';
import { Bot } from 'grammy';
import { createHash, createHmac } from 'node:crypto';

import {
	CITIES,
	GENDERS,
	HIV,
	METROS,
	ORIENTATIONS,
	SEX_ROLES,
	ZODIAC_SIGNS,
} from '../../public/data';

const token = env('TG');

export const bot = new Bot(typeof token === 'string' ? token : '');

bot.command('start', async (ctx) => {
	const chatId = ctx.chat.id;
	const messageText = ctx.message.text;

	await bot.api.sendMessage(chatId, 'Received your message: ' + messageText);
});

bot.on('message', async (ctx) => {
	const chatId = ctx.chat.id;
	const messageText = ctx.message.text;
	console.log(ctx?.message?.from);

	// console.log(
	// 	verifyTelegramData(
	// 		ctx?.message?.from,
	// 		typeof token === 'string' ? token : '',
	// 	),
	// );

	await bot.api.sendMessage(chatId, 'Received your message: ' + messageText);
});

export function verifyTelegramData(data: any): boolean {
	const initData = new URLSearchParams(data);
	const hash = data?.set('hash');
	const dataToCheck = [];

	initData.sort();
	initData.forEach((val, key) => {
		if (key !== 'hash') {
			dataToCheck.push(`${key}=${val}`);
		}
	});

	const dataCheckString = data;
	const botToken = typeof token === 'string' ? token : '';

	const secretKey = createHmac('sha256', botToken)
		.update('WebAppData')
		.digest();
	const hmac = createHmac('sha256', secretKey)
		.update(dataToCheck.join('\n'))
		.digest('hex');

	console.log('secretKey:', secretKey);
	console.log('hmac', hmac);

	// @ts-ignore
	return hmac === hash;
}

const uploadAll = async () => {
	await uploadCities();
	await uploadMetro();
	await uploadSexRoles();
	await uploadOrientations();
	await uploadZodiacs();
	await uploadHiv();
	await uploadGenders();
};

const uploadCities = async () => {
	let promises = [];

	for (const city of CITIES) {
		promises.push(
			strapi.entityService.create('api::city.city', {
				data: {
					lat: city?.coords?.lat,
					lon: city?.coords?.lon,
					district: city?.district,
					name: city?.name,
					subject: city?.subject,
					metro: false,
				},
			}),
		);
	}
	await Promise.all(promises);
};

const uploadMetro = async () => {
	for (const metro of METROS) {
		const currentCity = await strapi.entityService.findMany(
			'api::city.city',
			{
				filters: {
					name: metro?.name,
				},
			},
		);
		await strapi.entityService.update(
			'api::city.city',
			currentCity[0]?.id,
			{
				data: {
					metro: true,
				},
			},
		);
		for (const line of metro.lines) {
			const promises = [];
			for (const station of line.stations) {
				promises.push(
					strapi.entityService.create('api::metro.metro', {
						data: {
							lat: station?.lat,
							lon: station?.lng,
							name: station?.name,
							line: line?.name,
							color: line?.hex_color,
							city: currentCity[0]?.id,
						},
					}),
				);
			}
			await Promise.all(promises);
		}
	}
};

const uploadSexRoles = async () => {
	let promises = [];

	for (const role of SEX_ROLES) {
		promises.push(
			strapi.entityService.create('api::sex-role.sex-role', {
				data: {
					name: role,
				},
			}),
		);
	}
	await Promise.all(promises);
};

const uploadOrientations = async () => {
	let promises = [];

	for (const orientation of ORIENTATIONS) {
		promises.push(
			strapi.entityService.create('api::orientation.orientation', {
				data: {
					name: orientation,
				},
			}),
		);
	}
	await Promise.all(promises);
};

const uploadZodiacs = async () => {
	let promises = [];

	for (const zodiac of ZODIAC_SIGNS) {
		promises.push(
			strapi.entityService.create('api::zodiac-sign.zodiac-sign', {
				data: {
					name: zodiac,
				},
			}),
		);
	}
	await Promise.all(promises);
};

const uploadHiv = async () => {
	let promises = [];

	for (const hiv of HIV) {
		promises.push(
			strapi.entityService.create('api::hiv-status.hiv-status', {
				data: {
					name: hiv,
				},
			}),
		);
	}
	await Promise.all(promises);
};

const uploadGenders = async () => {
	let promises = [];

	for (const gender of GENDERS) {
		promises.push(
			strapi.entityService.create('api::gender.gender', {
				data: {
					name: gender,
				},
			}),
		);
	}
	await Promise.all(promises);
};
