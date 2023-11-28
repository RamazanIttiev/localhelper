import { isUserAgentTelegram } from 'common/utils/deviceInfo.ts';

import bike from 'assets/bike.webp';
import bonus from 'assets/bonus.webp';
import exchange from 'assets/exchange.webp';
import flowers from 'assets/flowers.webp';
import food from 'assets/food.webp';
import rent from 'assets/rent.webp';
import tours from 'assets/tours.webp';
import transfer from 'assets/transfer.webp';

export const categoriesPrimary = [
	{ title: 'Food', image: food, isLink: true, sx: { width: '48%', mb: 2 } },
	{
		title: 'Exchange',
		image: exchange,
		flowId: 'ZGw6MTI3Mjgx',
		isLink: isUserAgentTelegram,
		sx: { width: '48%', mb: 2 },
	},
	{ title: 'Bikes', image: bike, isLink: true, sx: { width: '48%', mb: 2 } },
	{
		title: 'Transfer',
		image: transfer,
		flowId: 'ZGw6MTI1MDQ5',
		isLink: true,
		sx: { width: '48%', mb: 2 },
	},
];

export const categoriesSecondary = [
	{
		title: 'Rent',
		image: rent,
		isLink: true,
		sx: { width: '22%', mb: 2 },
		imageSx: { height: '3rem' },
	},
	{
		title: 'Tours',
		image: tours,
		isLink: true,
		sx: { width: '22%', mb: 2 },
		imageSx: { height: '3rem' },
	},
	{
		title: 'Flowers',
		image: flowers,
		isLink: true,
		sx: { width: '22%', mb: 2 },
		imageSx: { height: '3rem' },
	},
	{
		title: 'Bonus',
		image: bonus,
		flowId: 'ZGw6MTI3Mjc4',
		isLink: false,
		sx: { width: '22%', mb: 2 },
		imageSx: { height: '3rem' },
	},
];
