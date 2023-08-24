import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ErrorType } from '../../models/error.model';
import { IconBadge } from '../../reactkit/iconBadge';
import { setHaptic } from '../../actions/webApp-actions';
import { LoaderButton } from '../../reactkit/loaderButton';
import { ProductModel } from '../../models/product.model';
import { Card, CardContent, Typography } from '@mui/material';

import { ImageLazy } from '../imageLazy';

interface ProductProps {
	flowId: string;
	loading: boolean;
	product: ProductModel;
	errorState: ErrorType;
	handleProductOrder: () => Promise<Response | undefined>;
}

export const ProductComponent: FC<ProductProps> = ({ flowId, loading, product, errorState, handleProductOrder }) => {
	return (
		<>
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
				<Link
					key={product.id}
					to={product.title.toLowerCase()}
					state={{ product, flowId }}
					style={{ position: 'relative' }}>
					{typeof product.image !== 'string' && (
						<>
							<ImageLazy
								smallImageUrl={product.image[0].thumbnails.small.url}
								imageUrl={product.image[0].url}
								containerStyles={{ height: '11rem', borderRadius: '1rem' }}
							/>
							{product.infoBadges?.map(icon => (
								<IconBadge
									key={icon}
									icon={icon}
									containerStyles={{
										position: 'absolute',
										top: '0.5rem',
										left: '0.5rem',
									}}
									iconStyles={{ margin: '0 2px' }}
								/>
							))}
						</>
					)}
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
				<LoaderButton
					loading={loading}
					errorState={errorState}
					text={`${product.price} Rs`}
					handleClick={handleProductOrder}
				/>
			</Card>
		</>
	);
};
