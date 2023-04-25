import React from 'react';
import { Link } from 'react-router-dom';
import { setHaptic } from '../../actions/webApp-actions';
import { RestaurantModel } from '../../models/productModel';
import { InfoBadge } from '../../components/reactkit/infoBadge';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const RestaurantsUI = ({ restaurant }: { restaurant: RestaurantModel }) => {
	return (
		<Card
			onClick={() => setHaptic('light')}
			sx={{
				pb: 2,
				display: 'flex',
				height: 'auto',
				boxShadow: 'none',
				minHeight: '16rem',
				flexDirection: 'column',
				background: 'transparent',
				justifyContent: 'space-between',
			}}>
			<Link to={`${restaurant.Title}`} state={restaurant} style={{ position: 'relative' }}>
				<CardMedia
					component="img"
					image={restaurant.Image[0].url}
					sx={{ height: '11rem', borderRadius: '2rem' }}
				/>

				<InfoBadge
					iterable={[]}
					containerStyles={{
						display: 'flex',
						position: 'absolute',
						top: '0.5rem',
						left: '0.5rem',
					}}
					iconStyles={{ margin: '0 2px' }}
				/>

				<CardContent
					sx={{
						'&:last-child': { pb: 0 },
						p: 0,
						height: '100%',
						display: 'flex',
						alignItems: 'baseline',
						flexDirection: 'column',
						justifyContent: 'center',
						mt: '1rem',
						mb: '0.5rem',
					}}>
					<Typography
						sx={{
							m: 0,
							display: 'flex',
							fontSize: '0.8rem',
							fontWeight: '600',
							alignItems: 'center',
							justifyContent: 'center',
							textTransform: 'capitalize',
						}}
						component="h3">
						{restaurant.Title}
					</Typography>
				</CardContent>
			</Link>
		</Card>
	);
};
