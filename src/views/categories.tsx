import React, { FC, useState } from 'react';
import { Grid, Pagination, Typography, Divider } from '@mui/material';
import { usePagination } from '../utils/pagination';
import { Product } from '../components/product';
import { ProductModel } from '../models/productModel';
import { useLocation, useParams } from 'react-router-dom';

interface CategoriesProps {
	// cart: ProductModel[];
	products: ProductModel[];
	handleSelectedProduct: (currentProduct: ProductModel) => void;
	// removeFromCart: (product: ProductModel) => void;
	// addToCart: (selectedProduct: ProductModel) => void;
}

export const Categories: FC<CategoriesProps> = ({ products, handleSelectedProduct }) => {
	const { pathname } = useLocation();
	const { category } = useParams();
	const [page, setPage] = useState(1);
	// const [isModalOpened, setOpenModal] = React.useState(false);

	const productsPerPage = 10;

	const productsSliced = usePagination(products, productsPerPage);
	const count = Math.ceil(products.length / productsPerPage);

	const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
		setPage(page);
		productsSliced.jump(page);
	};

	// const handleOpenModal = (currentProduct: ProductModel | null) => {
	// 	setSelectedProduct(currentProduct);
	// 	setOpenModal(true);
	// };
	// const handleCloseModal = () => setOpenModal(false);

	return (
		<>
			{pathname !== '/' && (
				<Typography textAlign={'center'} variant={'h5'} textTransform={'capitalize'}>
					{category}
				</Typography>
			)}
			<Divider />
			<Grid container spacing={2} sx={{ pt: 3 }}>
				{productsSliced.currentProducts().map((product: ProductModel) => {
					return (
						<Grid item xs={6} key={product.id}>
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
			{products.length >= productsPerPage && (
				<Pagination
					sx={{
						right: '50%',
						width: '100%',
						bottom: '0',
						display: 'flex',
						minWidth: '100%',
						position: 'fixed',
						paddingTop: '8px',
						background: '#fff',
						paddingBottom: '8px',
						justifyContent: 'center',
						transform: 'translateX(50%)',
					}}
					count={count}
					page={page}
					onChange={handlePageChange}
				/>
			)}
		</>
	);
};
