import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

import { theme } from 'ui/theme/theme.ts';

import { WorkingStatus } from 'ui/atoms/workingStatus.tsx';

interface Props {
	restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: Props) => {
	return (
		<Card
			sx={{
				mb: 2,
				display: 'flex',
				height: 'auto',
				boxShadow: 'none',
				flexDirection: 'column',
				background: 'transparent',
				justifyContent: 'space-between',
			}}>
			<Link to={`${restaurant.title}`} state={{ item: restaurant }} style={{ position: 'relative' }}>
				<CardMedia
					component="img"
					image={restaurant.image[0].url}
					sx={{ height: '11rem', borderRadius: theme.tg_theme.borderRadius.base }}
				/>

				<CardContent
					sx={{
						'&:last-child': { pb: 0 },
						p: 0,
						mt: '1rem',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Typography
						sx={{
							m: 0,
							display: 'flex',
							fontWeight: '600',
							alignItems: 'center',
							justifyContent: 'center',
							textTransform: 'capitalize',
						}}
						component="h3"
						variant={'subtitle2'}>
						{restaurant.title}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<WorkingStatus workingStatus={restaurant.workingStatus} workingTime={restaurant.workingTime} />
					</Box>
				</CardContent>
			</Link>
		</Card>
	);
};
