import React, { FC } from 'react';
import { Grid, Box } from '@mui/material';
import { Product } from '../components/product';
import { ProductModel } from '../models/productModel';

interface ProductsProps {
	// cart: ProductModel[];
	products: ProductModel[];
	handleSelectedProduct: (currentProduct: ProductModel) => void;
	// removeFromCart: (product: ProductModel) => void;
	// addToCart: (selectedProduct: ProductModel) => void;
}

export const Products: FC<ProductsProps> = ({ products, handleSelectedProduct }) => {
	// const theme = useTheme();
	// const [page, setPage] = useState(1);
	// const [isModalOpened, setOpenModal] = React.useState(false);

	// const productsPerPage = 10;

	// const productsSliced = usePagination(products, productsPerPage);
	// const count = Math.ceil(products.length / productsPerPage);

	// const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
	// 	setPage(page);
	// 	productsSliced.jump(page);
	// };

	// const handleOpenModal = (currentProduct: ProductModel | null) => {
	// 	setSelectedProduct(currentProduct);
	// 	setOpenModal(true);
	// };
	// const handleCloseModal = () => setOpenModal(false);

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Grid container spacing={2} sx={{ pt: 3, justifyContent: 'center' }}>
				{products.map((product: ProductModel) => {
					return (
						<Grid item xs={6} md={5} key={product.id}>
							<Product
								product={product}
								// cart={cart}
								// addToCart={addToCart}
								// removeFromCart={removeFromCart}
								handleSelectedProduct={handleSelectedProduct}
								// handleOpenModal={handleOpenModal}
							/>
						</Grid>
					);
				})}
			</Grid>
			{/*<ProductModal*/}
			{/*	// cart={cart}*/}
			{/*	// addToCart={addToCart}*/}
			{/*	isModalOpened={isModalOpened}*/}
			{/*	// removeFromCart={removeFromCart}*/}
			{/*	selectedProduct={selectedProduct}*/}
			{/*	handleCloseModal={handleCloseModal}*/}
			{/*/>*/}
			{/*{products.length >= productsPerPage && (*/}
			{/*	<Pagination*/}
			{/*		color={'secondary'}*/}
			{/*		sx={{*/}
			{/*			right: '50%',*/}
			{/*			width: '100%',*/}
			{/*			bottom: '56px',*/}
			{/*			display: 'flex',*/}
			{/*			minWidth: '100%',*/}
			{/*			position: 'fixed',*/}
			{/*			paddingTop: '8px',*/}
			{/*			paddingBottom: '8px',*/}
			{/*			justifyContent: 'center',*/}
			{/*			transform: 'translate(-50%)',*/}
			{/*			background: theme.palette.secondary.main,*/}
			{/*		}}*/}
			{/*		count={count}*/}
			{/*		page={page}*/}
			{/*		onChange={handlePageChange}*/}
			{/*	/>*/}
			{/*)}*/}
		</Box>
	);
};
