import React, { FC } from 'react';
import { ErrorType } from '../../models/error';
import { ProductModel } from '../../models/productModel';
import { AmountButtons } from '../../components/amountButtons';
import { LoaderButton } from '../../components/reactkit/loaderButton';
import { Box, Divider, List, ListItem, Typography, useTheme } from '@mui/material';

import dishImage from '../../assets/food.jpg';

interface CartProps {
	loading: boolean;
	errorState: ErrorType;
	cartTotalAmount: number;
	handleOrder: () => void;
	cartProducts: ProductModel[] | [];
	addToCart: (product: ProductModel) => void;
	removeFromCart: (product: ProductModel) => void;
}

export const Cart: FC<CartProps> = ({
	cartProducts,
	cartTotalAmount,
	loading,
	errorState,
	addToCart,
	removeFromCart,
	handleOrder,
}) => {
	const theme = useTheme();

	return (
		<>
			<Box>
				<List sx={{ pt: 0 }}>
					{cartProducts.map(product => {
						return (
							<>
								<ListItem key={product.id} disableGutters>
									{product.image !== undefined ? (
										<Box
											component={'img'}
											src={product.image[0].url}
											alt={product.image[0].alt}
											sx={{ width: '25%', borderRadius: 1, mr: 2 }}
										/>
									) : (
										<Box
											component={'img'}
											src={dishImage}
											alt={product.title}
											sx={{ width: '25%', borderRadius: 1, mr: 2 }}
										/>
									)}
									<Box
										sx={{
											width: '100%',
										}}>
										<Typography component={'h3'} variant={'h6'} gutterBottom>
											{product.title}
										</Typography>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<Typography
												variant={'body1'}
												sx={{
													background: theme.palette.primary.main,
													borderRadius: '50%',
													width: '24px',
													height: '24px',
													color: ' #fff',
													textAlign: ' center',
													mr: 0.5,
												}}>
												{product.amount!}
											</Typography>
											<Typography variant={'body1'}>
												x <strong>{product.price}</strong>
											</Typography>
										</Box>
									</Box>
									<AmountButtons
										product={product}
										addToCart={addToCart}
										removeFromCart={removeFromCart}
									/>
								</ListItem>
								<Divider />
							</>
						);
					})}
				</List>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginTop: '24px',
						fontWeight: '600',
					}}>
					<Typography sx={{ fontWeight: '600' }}>Total:</Typography>
					<Typography sx={{ fontWeight: '600' }}>{cartTotalAmount} Rs</Typography>
				</Box>
			</Box>
			<LoaderButton text={'Order'} loading={loading} errorState={errorState} handleClick={handleOrder} />
		</>
	);
};
