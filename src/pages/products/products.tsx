import React, { Suspense } from 'react';
import { useCart } from '../cart/hooks/useCart';
import { Container, Grid } from '@mui/material';
import { Product } from '../../components/product';
import { Await, useLoaderData } from 'react-router-dom';
import { SkeletonLoader } from '../../components/skeletonLoader';
import { ProductModel } from '../../models/productModel';
import { useReactRouter } from '../../hooks/useReactRouter';

export const Products = () => {
	const { isServiceRoute } = useReactRouter();
	const { removeFromCart, addToCart, cartProducts } = useCart();
	const { products } = useLoaderData() as { products: ProductModel[] };

	return (
		<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
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
											amountButtonsVisible={isServiceRoute}
										/>
									</Grid>
								);
							});
						}}
					</Await>
				</Suspense>
			</Grid>
		</Container>
	);
};
