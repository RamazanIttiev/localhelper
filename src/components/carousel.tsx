import React from 'react';
import { isDesktop } from 'react-device-detect';
import Carousel from 'react-material-ui-carousel';
import { IconBadges } from 'reactkit/iconBadges';

import { Box, useTheme } from '@mui/material';

import { isUserAgentTelegram } from 'utils/deviceInfo';

interface Props {
	title: string;
	iconBadges: { url: string }[] | undefined;
	images: { url: string }[];
}

export const MuiCarousel = ({ title, iconBadges, images }: Props) => {
	const theme = useTheme();

	return (
		<Carousel
			autoPlay={false}
			stopAutoPlayOnHover
			animation={'slide'}
			navButtonsAlwaysInvisible={isUserAgentTelegram && !isDesktop}
			navButtonsAlwaysVisible={!isUserAgentTelegram && isDesktop}
			indicatorIconButtonProps={{ style: { margin: '0 0.3rem' } }}
			activeIndicatorIconButtonProps={{ style: { color: theme.palette.background.paper } }}>
			{images.map(({ url }) => {
				return (
					<React.Fragment key={title}>
						<Box
							component={'img'}
							src={url}
							alt={title}
							width={'100%'}
							sx={{
								borderRadius: 3,
								height: '20rem',
								margin: '0 auto',
								display: 'block',
								objectFit: 'cover',
							}}
						/>
						<IconBadges iconBadges={iconBadges} />
					</React.Fragment>
				);
			})}
		</Carousel>
	);
};
