import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useAirtableData } from '../hooks';
import { Product } from '../components/product';
import { useParams } from 'react-router-dom';
import { SkeletonLoader } from '../components/skeletonLoader';
import { ProductModel } from '../models/productModel';

interface ProductsProps {
	cartProducts: ProductModel[];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const Products: FC<ProductsProps> = ({ cartProducts, removeFromCart, addToCart }) => {
	const { categoryId } = useParams();

	const products = useAirtableData(categoryId);

	return (
		<>
			<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
				{products.length !== 0 ? (
					products.map((product: any) => {
						return (
							<Grid item xs={6} md={5} key={product.id}>
								<Product
									product={product}
									cartProducts={cartProducts}
									addToCart={addToCart}
									removeFromCart={removeFromCart}
								/>
							</Grid>
						);
					})
				) : (
					<SkeletonLoader />
				)}
			</Grid>
		</>
	);
};
