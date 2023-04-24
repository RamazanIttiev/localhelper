import React from 'react';
import { Link } from 'react-router-dom';
import { setHaptic } from '../../actions/webApp-actions';
import { InfoBadge } from '../../components/reactkit/infoBadge';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const ServicesUI = ({ title, image }: { title: string; image: string }) => {
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
			<Link to={`${title}`} state={{ title, image }} style={{ position: 'relative' }}>
				<CardMedia component="img" image={image} sx={{ height: '11rem', borderRadius: '2rem' }} />

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
						{title}
					</Typography>
				</CardContent>
			</Link>
		</Card>
	);
};
