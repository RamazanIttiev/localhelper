import React from 'react';
import { useCart } from '../cart/hooks/useCart';
import { Container, Grid } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { useReactRouter } from '../../hooks/useReactRouter';

export const Products = () => {
	const { isServiceRoute } = useReactRouter();
	const { removeFromCart, addToCart, cartProducts } = useCart();
	const { productPageData } = useLoaderData() as any;
	console.log(productPageData);
	return (
		<>
			{/*<HeaderImage image={data?.headerImage} title={data?.title} />*/}
			<Container sx={{ pt: 2 }} maxWidth={'md'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{/*<Suspense fallback={<SkeletonLoader />}>*/}
					{/*	<Await resolve={productPageData}>*/}
					{/*		{(resolvedProducts: ProductPageData) => {*/}
					{/*			return resolvedProducts.products.map((product: ProductModel) => {*/}
					{/*				return (*/}
					{/*					<Grid item xs={6} md={5} key={product.id}>*/}
					{/*						<ProductContainer*/}
					{/*							product={product}*/}
					{/*							addToCart={addToCart}*/}
					{/*							cartProducts={cartProducts}*/}
					{/*							removeFromCart={removeFromCart}*/}
					{/*							amountButtonsVisible={isServiceRoute}*/}
					{/*						/>*/}
					{/*					</Grid>*/}
					{/*				);*/}
					{/*			});*/}
					{/*		}}*/}
					{/*	</Await>*/}
					{/*</Suspense>*/}
				</Grid>
			</Container>
		</>
	);
};
