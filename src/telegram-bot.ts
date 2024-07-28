import { env } from '@strapi/utils';
import { Bot } from 'grammy';
import { createHash, createHmac } from 'node:crypto';

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

	console.log(
		verifyTelegramData(
			ctx?.message?.from,
			typeof token === 'string' ? token : '',
		),
	);

	await bot.api.sendMessage(chatId, 'Received your message: ' + messageText);
});

function verifyTelegramData(data: any, botToken: string): boolean {
	const dataCheckString = Object.entries(sortObjectKeys(data))
		.map(([key, value]) => `${key}=${value}`)
		.join('\n');

	console.log('dataCheckString', dataCheckString);

	const secretKey = createHash('sha256').update(botToken).digest('hex');
	console.log('secretKey', secretKey);

	const hmac = createHmac('sha256', secretKey);
	hmac.update(dataCheckString);
	const calculatedHash = hmac.digest('hex');
	console.log('calculatedHash', calculatedHash);

	return calculatedHash === data.hash;
}

function sortObjectKeys(obj: Record<string, any>): Record<string, any> {
	// Преобразуем объект в массив пар ключ-значение
	const entries = Object.entries(obj);

	// Сортируем массив по ключам
	const sortedEntries = entries.sort((a, b) => a[0].localeCompare(b[0]));

	// Создаем новый объект с отсортированными ключами
	return Object.fromEntries(sortedEntries);
}
// export const uploadCities = async () => {
// 	const filePath =
// 		'C:\\Users\\kiriu\\Документы\\GitHub\\him-backend\\russian-cities.json';
//
// 	let cities = [];
//
// 	try {
// 		const data = await fs.promises.readFile(filePath, 'utf8');
// 		cities = cities.concat(JSON.parse(data));
// 	} catch (err) {
// 		console.error(err);
// 	}
//
// 	console.log(cities);
//
// 	for (const city of cities) {
// 		await strapi.entityService.create('api::city.city', {
// 			data: {
// 				lat: city?.coords?.lat,
// 				lon: city?.coords?.lon,
// 				district: city?.district,
// 				name: city?.name,
// 				subject: city?.subject,
// 			},
// 		});
// 	}
// };

// export const uploadMetro = async () => {
// const filePath =
// 	'C:\\Users\\kiriu\\Документы\\GitHub\\him-backend\\metro.json';
// let metros = [];
//
// try {
// 	const data = await fs.promises.readFile(filePath, 'utf8');
// 	metros = metros.concat(JSON.parse(data));
// } catch (err) {
// 	console.error(err);
// }
//
// for (const metro of metros) {
// 	const currentCity = await strapi.entityService.findMany(
// 		'api::city.city',
// 		{
// 			filters: {
// 				name: metro?.name,
// 			},
// 		},
// 	);
// 	console.log(currentCity);
// 	for (const line of metro.lines) {
// 		const promises = [];
// 		for (const station of line.stations) {
// 			promises.push(
// 				strapi.entityService.create('api::metro.metro', {
// 					data: {
// 						lat: station?.lat,
// 						lon: station?.lng,
// 						name: station?.name,
// 						line: line?.name,
// 						color: line?.hex_color,
// 						city: currentCity[0]?.id,
// 					},
// 				}),
// 			);
// 		}
// 		await Promise.all(promises);
// 	}
// }
// };
