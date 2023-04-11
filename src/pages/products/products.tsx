import React, { Suspense } from 'react';
import { Grid } from '@mui/material';
import { useCart } from '../cart/hooks/useCart';
import { Product } from '../../components/product';
import { Await, useLoaderData } from 'react-router-dom';
import { SkeletonLoader } from '../../components/skeletonLoader';
import { ProductModel } from '../productDetails/models/productModel';

export const Products = () => {
	const { products } = useLoaderData() as { products: ProductModel[] };
	const { removeFromCart, addToCart, cartProducts } = useCart();

	return (
		<>
			<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
				<Suspense fallback={<SkeletonLoader />}>
					<Await resolve={products}>
						{(resolvedProducts: ProductModel[]) => {
							return resolvedProducts.map((product: ProductModel) => {
								return (
									<Grid item xs={6} md={5} key={product.id}>
										<Product
											product={product}
											addToCart={addToCart}
											cartProducts={cartProducts}
											removeFromCart={removeFromCart}
										/>
									</Grid>
								);
							});
						}}
					</Await>
				</Suspense>
			</Grid>
		</>
	);
};
