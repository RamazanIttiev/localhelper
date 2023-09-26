import React from 'react';
import { ActionButton } from 'reactkit/actionButton';
import { IconBadges } from 'reactkit/iconBadges';
import { Link } from 'reactkit/link';

import { Box, Card, CardContent, Typography } from '@mui/material';

import { theme } from 'theme';

import { Product } from 'pages/products-list/product/product.model';

import { isUserAgentTelegram } from 'utils/deviceInfo';

interface Props {
	flowId: string;
	product: Product;
	handleClick: () => void;
}

export const ProductComponent = ({ flowId, product, handleClick }: Props) => {
	return (
		<Card
			sx={{
				pb: 2,
				display: 'flex',
				height: 'auto',
				boxShadow: 'none',
				flexDirection: 'column',
				background: 'transparent',
				justifyContent: 'space-between',
			}}>
			<Link key={product.id} to={product.title.toLowerCase()} state={{ product, flowId }}>
				<>
					<Box
						component={'img'}
						src={product.image[0].url}
						alt={product.title}
						sx={{
							display: 'block',
							width: '100%',
							height: '11rem',
							borderRadius: theme.tg_theme.borderRadius.base,
							objectFit: 'cover',
						}}
					/>
					<IconBadges iconBadges={product.iconBadges} />
				</>
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
						{product.title.toLowerCase()}
					</Typography>
				</CardContent>
			</Link>
			{isUserAgentTelegram && <ActionButton text={`${product.price} Rs`} handleClick={handleClick} />}
		</Card>
	);
};
