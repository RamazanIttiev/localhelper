import * as React from 'react';
import { Box, Button, Typography, Dialog, IconButton, DialogTitle } from '@mui/material';
import { FC } from 'react';
import { ProductModel } from '../models/productModel';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { AmountButtons } from './amountButtons';
import { isProductInCart } from '../utils/cart';

interface ProductModalProps {
	cart: ProductModel[];
	selectedProduct: ProductModel | null;
	isModalOpened: boolean;
	handleCloseModal: () => void;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const ProductModal: FC<ProductModalProps> = ({
	cart,
	addToCart,
	isModalOpened,
	removeFromCart,
	selectedProduct,
	handleCloseModal,
}) => {
	const productInCart = isProductInCart(cart, selectedProduct);

	return (
		selectedProduct && (
			<div>
				<Dialog
					sx={{
						'& .MuiDialogContent-root': {
							padding: 0,
						},
					}}
					open={isModalOpened}
					onClose={handleCloseModal}>
					<DialogTitle sx={{ m: 0, p: 2 }}>
						<IconButton
							aria-label="close"
							onClick={handleCloseModal}
							sx={{
								position: 'absolute',
								right: 8,
								top: 0,
								color: theme => theme.palette.grey[500],
							}}>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent dividers>
						<Box
							component={'img'}
							src={selectedProduct.image[0].url}
							alt={selectedProduct.image[0].alt}
							width={'100%'}
						/>
						<Box sx={{ width: '100%', pr: 2, pl: 2 }}>
							<Typography id="transition-modal-title" variant="h6" component="h2" textAlign={'center'}>
								{selectedProduct.title}
							</Typography>
							<Typography sx={{ mt: 2 }}>
								<strong>Price:</strong> {selectedProduct.price}
							</Typography>
							<Typography sx={{ mt: 2, mb: 3 }}>
								<strong>Description:</strong> {selectedProduct.description}
							</Typography>
						</Box>
					</DialogContent>
					<DialogActions>
						{productInCart ? (
							<AmountButtons
								product={selectedProduct}
								amount={productInCart.amount}
								addToCart={addToCart}
								removeFromCart={removeFromCart}
							/>
						) : (
							<Button
								sx={{ height: '32px' }}
								variant={'contained'}
								fullWidth
								onClick={() => addToCart(selectedProduct)}>
								Buy
							</Button>
						)}
					</DialogActions>
				</Dialog>
			</div>
		)
	);
};
