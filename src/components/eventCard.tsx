import React from 'react';
import { InfoBadge } from 'reactkit/infoBadge';
import { LoaderButton } from 'reactkit/loaderButton';

import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { isUserAgentTelegram } from 'utils/deviceInfo';

import eventImage from 'assets/jpg/event.jpg';

export const EventCard = () => {
	return (
		<Card>
			<CardMedia src={eventImage} />
			<CardContent>
				<InfoBadge text={'India'} />
				<Typography>Золотой храм — Амритсар Индия</Typography>
				<Typography>09.05.2023</Typography>
				<Typography>
					Золотой храм в Амритсаре, Индия — это место, где каждый год сотни тысяч паломников сходятся, чтобы
					почтить своих богов и просто насладиться красотой этого удивительного места. Этот храм, покрытый
					золотом, является одним из самых знаменитых святынь в Индии, а его богатая история и культурное
					значение делают его обязательным местом для посещения при поездке в Индию.
				</Typography>
			</CardContent>
			<CardActions>
				<LoaderButton handleClick={() => console.log()} isMainButton={isUserAgentTelegram} />
			</CardActions>
		</Card>
	);
};
