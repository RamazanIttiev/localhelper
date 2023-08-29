import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ArrowBackIosNewRounded } from '@mui/icons-material';

interface Props {
	style?: CSSProperties;
}

export const ArrowBack = ({ style }: Props) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(-1);
	};

	return (
		<IconButton
			onClick={handleClick}
			edge={'start'}
			sx={{ zIndex: 1, background: '#000', mixBlendMode: 'difference', ...style }}>
			<ArrowBackIosNewRounded sx={{ color: '#fff' }} />
		</IconButton>
	);
};
