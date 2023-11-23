import { isUserAgentTelegram } from 'common/utils/deviceInfo';

import bike from 'assets/bike.webp';
import exchange from 'assets/exchange.webp';
import food from 'assets/food.webp';

export const categoriesPrimary = [
	{ title: 'Food', image: food, isLink: true, flowId: 'ZGw6MTQ0NjE1', sx: { width: '48%', mb: 2 } },
	{ title: 'Bikes', image: bike, isLink: true, flowId: 'ZGw6MTM2Nzcz', sx: { width: '48%', mb: 2 } },
	{
		title: 'Exchange',
		image: exchange,
		flowId: 'ZGw6MTI3Mjgx',
		isLink: isUserAgentTelegram,
		sx: { width: '100%' },
	},
	// { title: 'Feed', image: feed, isLink: true, flowId: '', sx: { width: '100%' } },
];
