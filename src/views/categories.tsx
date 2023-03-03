import React, { FC, useState } from 'react';
import { Grid, Pagination, Typography, Divider } from '@mui/material';
import { usePagination } from '../utils/pagination';
import { Product } from '../components/product';
import { ProductModal } from '../components/modal';
import { ProductModel } from '../models/productModel';
import { useLocation } from 'react-router-dom';
import { useCategory } from '../hooks/useCategory';

interface CategoriesProps {
	// cart: ProductModel[];
	products: ProductModel[];
	// removeFromCart: (product: ProductModel) => void;
	// addToCart: (selectedProduct: ProductModel) => void;
}

export const Categories: FC<CategoriesProps> = ({ products }) => {
	const { pathname } = useLocation();
	const categoryTitle = useCategory();
	const [page, setPage] = useState(1);
	const [isModalOpened, setOpenModal] = React.useState(false);
	const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);

	const productsPerPage = 10;

	const productsSliced = usePagination(products, productsPerPage);
	const count = Math.ceil(products.length / productsPerPage);

	const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
		setPage(page);
		productsSliced.jump(page);
	};

	const handleOpenModal = (currentProduct: ProductModel | null) => {
		setSelectedProduct(currentProduct);
		setOpenModal(true);
	};
	const handleCloseModal = () => setOpenModal(false);

	return (
		<>
			<Typography variant={'h5'} textAlign={'left'}>
				{/*{currentCategory}*/}
			</Typography>
			<Typography textAlign={'center'} variant={'h5'}>
				{pathname !== '/' && categoryTitle}
			</Typography>
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
								handleOpenModal={handleOpenModal}
							/>
						</Grid>
					);
				})}
			</Grid>
			<ProductModal
				// cart={cart}
				// addToCart={addToCart}
				isModalOpened={isModalOpened}
				// removeFromCart={removeFromCart}
				selectedProduct={selectedProduct}
				handleCloseModal={handleCloseModal}
			/>
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
