import React from 'react';
import { Box, Icon, IconButton, Typography } from '@mui/material';
import { theme } from '../../theme';
import { useLocation } from 'react-router-dom';
import { WorkingStatus } from '../../components/reactkit/workingStatus';
import { useReactRouter } from '../../hooks/useReactRouter';

interface HeaderProps {
	image?: string;
	title?: string;
	location?: string;
	workingTime?: string;
	workingStatus?: string;
}

export const Header = ({ image, title, workingTime, workingStatus, location }: HeaderProps) => {
	const { pathname } = useLocation();
	const { isRestaurantRoute } = useReactRouter();

	const shareData = {
		title: title,
		text: 'Welcome to Localhelper',
		url: `https://test.localhelper.ru${pathname}`,
		files: [new File(['<img src={image} alt={title}/>'], 'preview.html', { type: 'text/html' })],
	};

	const shareContent = async () => {
		if (navigator.share) {
			try {
				await navigator.share(shareData);
			} catch (error) {
				console.log(error);
			}
		}
	};

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
				{navigator.share !== undefined && (
					<IconButton
						size={'large'}
						color={'inherit'}
						sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
						onClick={shareContent}>
						<Icon>ios_share</Icon>
					</IconButton>
				)}
			</Box>
		</>
	);
};
