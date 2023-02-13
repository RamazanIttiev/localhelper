import React, { FC, useState, useEffect } from 'react';
import { Container, Grid, Pagination, Typography, Divider } from '@mui/material';
import { usePagination } from '../utils/pagination';
import { Product } from '../components/product';
import { ProductModal } from '../components/modal';
import { ProductModel } from '../models/productModel';
import { airtableBase } from '../app/App';
import { mapFoodData } from '../services/mappers';
import { useCategory } from '../hooks/useCategory';

interface LayoutProps {
	cart: ProductModel[];
	removeFromCart: (productId: number) => void;
	addToCart: (selectedProduct: ProductModel, amount: number) => void;
}

export const Layout: FC<LayoutProps> = ({ cart, addToCart, removeFromCart }) => {
	const [page, setPage] = useState(1);
	const [isModalOpened, setOpenModal] = React.useState(false);
	const [products, setproducts] = useState<ProductModel[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);

	const currentCategory = useCategory();

	useEffect(() => {
		airtableBase(currentCategory)
			.select({
				view: currentCategory,
			})
			.eachPage(records => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				return setproducts(mapFoodData(records));
			});
	}, [currentCategory]);

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
		<Container sx={{ pt: 9, pb: 9 }}>
			<Typography variant={'h5'} textAlign={'left'}>
				{currentCategory}
			</Typography>
			<Divider />
			<Grid container spacing={2} sx={{ pt: 3 }}>
				{productsSliced.currentProducts().map((product: ProductModel) => {
					return (
						<Grid item xs={6} key={product.id}>
							<Product
								product={product}
								cart={cart}
								addToCart={addToCart}
								removeFromCart={removeFromCart}
								handleOpenModal={handleOpenModal}
							/>
						</Grid>
					);
				})}
			</Grid>
			<ProductModal
				selectedProduct={selectedProduct}
				isModalOpened={isModalOpened}
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
		</Container>
	);
};
