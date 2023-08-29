import React, { CSSProperties, useState } from 'react';
import { BoxProps, styled } from '@mui/material';

const Container = styled('div')({
	position: 'relative',
	overflow: 'hidden',
});

const SmallImage = styled('img', {
	shouldForwardProp: prop => prop !== 'loaded',
})<{
	loaded: boolean;
}>(({ loaded }) => ({
	position: 'absolute',
	width: '100%',
	height: '100%',
	transition: 'opacity 0.3s ease-out',
	opacity: loaded ? 0 : 1,
}));

const ActualImage = styled('img', {
	shouldForwardProp: prop => prop !== 'loaded',
})<{
	loaded: boolean;
}>(({ loaded }) => ({
	display: loaded ? 'block' : 'none',
	width: '100%',
	height: '100%',
	objectFit: 'cover',
}));

interface ImageLazyProps extends BoxProps {
	smallImageUrl: string | undefined;
	imageUrl: string;
	containerStyles?: CSSProperties;
	imageStyles?: CSSProperties;
	smallImageStyles?: CSSProperties;
}

export const ImageLazy = ({
	smallImageUrl,
	imageUrl,
	containerStyles,
	imageStyles,
	smallImageStyles,
}: ImageLazyProps) => {
	const [loaded, setLoaded] = useState(false);

	const handleImageLoad = () => {
		setLoaded(true);
	};

	return (
		<Container sx={containerStyles}>
			<SmallImage src={smallImageUrl} alt="Small Image" loaded={loaded} style={imageStyles} />
			<ActualImage
				src={imageUrl}
				alt="Actual Image"
				loaded={loaded}
				onLoad={handleImageLoad}
				style={smallImageStyles}
			/>
		</Container>
	);
};
