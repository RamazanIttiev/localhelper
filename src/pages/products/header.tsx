import React from 'react';
import { Box, Icon, Typography } from '@mui/material';
import { theme } from '../../theme';
import { WorkingStatus } from '../../reactkit/workingStatus';
import { useReactRouter } from '../../hooks/useReactRouter';

interface HeaderProps {
	image?: string;
	title?: string;
	location?: string;
	workingTime?: string;
	workingStatus?: string;
}

export const Header = ({ image, title, workingTime, workingStatus, location }: HeaderProps) => {
	const { isRestaurantRoute } = useReactRouter();

	return (
		<>
			{image && (
				<Box
					component="img"
					src={image}
					alt={title}
					sx={{
						display: 'block',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						width: '100%',
						objectFit: 'cover',
						height: '18rem',
					}}
				/>
			)}
			<Box
				sx={{
					top: 0,
					pb: '2rem',
					pl: '2rem',
					width: '100%',
					display: 'flex',
					height: '18rem',
					alignItems: 'flex-start',
					justifyContent: 'end',
					flexDirection: 'column',
					position: 'absolute',
					background: `linear-gradient(to bottom, rgba(255,255,255, 0), ${theme.palette.background.default})`,
				}}>
				<Typography variant={'body1'} fontSize={'2rem'}>
					{title}
				</Typography>
				{isRestaurantRoute && (
					<Box
						sx={{
							width: '9rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'baseline',
							justifyContent: 'space-between',
						}}>
						{workingStatus && workingTime && (
							<Box sx={{ marginBottom: '1rem' }}>
								<WorkingStatus workingStatus={workingStatus} workingTime={workingTime} />
							</Box>
						)}
						{location && (
							<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
								<Icon
									fontSize={'small'}
									sx={{
										marginRight: '0.2rem',
									}}>
									location_on
								</Icon>
								<Typography component="p" variant={'body1'}>
									{location}
								</Typography>
							</Box>
						)}
					</Box>
				)}
			</Box>
		</>
	);
};
