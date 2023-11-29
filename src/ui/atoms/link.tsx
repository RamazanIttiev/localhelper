import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { SxProps, styled } from '@mui/material';

interface Props {
	key: string;
	to: string;
	state?: any;
	children: ReactNode;
	sx?: SxProps;
}

const StyledLink = styled(RouterLink)(``, () => ({
	position: 'relative',
	transition: 'all 0.2s ease',
	'&:active': { transform: 'scale(0.9)' },
}));

export const Link = ({ key, to, state, children, sx }: Props) => {
	return (
		<StyledLink key={key} to={to} state={state} sx={sx}>
			{children}
		</StyledLink>
	);
};
