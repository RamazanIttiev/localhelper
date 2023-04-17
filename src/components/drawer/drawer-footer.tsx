import React from 'react';
import { Box, Button, useTheme } from '@mui/material';

interface DrawerFooterProps {
	toggleDrawer: (value: boolean) => () => void;
}

export const DrawerFooter = ({ toggleDrawer }: DrawerFooterProps) => {
	const theme = useTheme();

	return (
		<Box sx={{ height: '100%', backgroundColor: theme.palette.background.paper }}>
			<Box
				sx={{
					position: 'fixed',
					bottom: 0,
					height: '72px',
					zIndex: 100,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'end',
					flexDirection: 'column',
					paddingBottom: '8px',
					borderTopLeftRadius: '1rem',
					borderTopRightRadius: '1rem',
					backgroundColor: theme.palette.background.paper,
				}}>
				<Box
					sx={{
						width: 30,
						height: 6,
						backgroundColor: '#fff',
						borderRadius: 3,
						position: 'absolute',
						top: 8,
						left: 'calc(50% - 15px)',
					}}
				/>
				<Button onClick={toggleDrawer(true)} variant={'contained'} sx={{ m: '24px auto 0', width: '60%' }}>
					Your order
				</Button>
			</Box>
		</Box>
	);
};
