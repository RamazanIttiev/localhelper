import React from 'react';
import { ErrorType } from '../../models/error';
import { ProductModel } from '../../models/productModel';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { AmountButtons } from '../../components/amountButtons';
import { LoaderButton } from '../../components/reactkit/loaderButton';
import { Box, Button, Divider, Icon, IconButton, List, ListItem, Typography, useTheme } from '@mui/material';

import dishImage from '../../assets/food.jpg';

interface CartProps {
	loading: boolean;
	isCartOpened: boolean;
	errorState: ErrorType;
	clearCart: () => void;
	cartTotalAmount: number;
	handleOrder: () => void;
	cartProducts: ProductModel[] | [];
	addToCart: (product: ProductModel) => void;
	toggleCart: (value: boolean) => () => void;
	removeFromCart: (product: ProductModel) => void;
}

const drawerBleeding = 72;

export const CartUI = ({
	loading,
	clearCart,
	addToCart,
	toggleCart,
	errorState,
	handleOrder,
	isCartOpened,
	cartProducts,
	removeFromCart,
	cartTotalAmount,
}: CartProps) => {
	const theme = useTheme();

	return (
		<>
			<Box sx={{ height: '100%', backgroundColor: theme.palette.background.paper }}>
				{!isCartOpened && (
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
						<Button
							onClick={toggleCart(true)}
							variant={'contained'}
							sx={{ m: '24px auto 0', width: '60%' }}>
							Your order
						</Button>
					</Box>
				)}

				<SwipeableDrawer
					anchor="bottom"
					open={isCartOpened}
					keepMounted={false}
					onClose={toggleCart(false)}
					onOpen={toggleCart(true)}
					swipeAreaWidth={drawerBleeding}
					disableSwipeToOpen={false}
					ModalProps={{
						keepMounted: true,
					}}>
					<Box
						sx={{
							position: 'absolute',
							top: -drawerBleeding,
							borderTopLeftRadius: 8,
							borderTopRightRadius: 8,
							visibility: 'visible',
							right: 0,
							left: 0,
							backgroundColor: theme.palette.background.paper,
						}}>
						{isCartOpened && (
							<>
								<Box
									sx={{
										width: 30,
										height: 6,
										backgroundColor: '#fff',
										borderRadius: 3,
										position: 'absolute',
										top: '0.5rem',
										left: 'calc(50% - 15px)',
									}}
								/>
								<Typography sx={{ p: 3, color: '#fff', textAlign: 'center' }}>Your order</Typography>
								<IconButton
									sx={{ position: 'absolute', right: 8, top: '1rem', color: '#fff' }}
									onClick={clearCart}>
									<Icon>delete</Icon>
								</IconButton>
							</>
						)}
					</Box>
					<Box
						sx={{
							px: 2,
							pb: 2,
							height: '100%',
							overflow: 'auto',
						}}>
						<Box>
							<List sx={{ pt: 0 }}>
								{cartProducts.map(product => {
									return (
										<React.Fragment key={product.id}>
											<ListItem disableGutters>
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
													showAmount={false}
													addToCart={addToCart}
													productFromCart={product}
													removeFromCart={removeFromCart}
												/>
											</ListItem>
											<Divider />
										</React.Fragment>
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
						<LoaderButton
							text={'Order'}
							loading={loading}
							errorState={errorState}
							handleClick={handleOrder}
						/>
					</Box>
				</SwipeableDrawer>
			</Box>
		</>
	);
};
