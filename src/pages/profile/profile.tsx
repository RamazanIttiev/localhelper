import React from 'react';

import { Box, Container } from '@mui/material';

import profileImage from 'assets/profileImage.jpeg';

interface Props {
	userPhoto: string;
}

export const Profile = ({ userPhoto }: Props) => {
	return (
		<Container>
			<Box>
				<Box
					component={'img'}
					src={userPhoto || profileImage}
					sx={{ borderRadius: '50%', mr: 2, height: '3.5rem' }}
				/>
			</Box>
		</Container>
	);
};
