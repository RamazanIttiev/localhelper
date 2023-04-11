import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/product';
import { SkeletonLoader } from '../../components/skeletonLoader';
import { useCart } from '../cart/hooks/useCart';
import { useProducts } from './hooks/useProducts';
import { ProductModel } from '../productDetails/models/productModel';
import { airtableBase } from '../../app/App';
import { getAirtableView } from '../../utils/airtable';
import { mapData } from '../../utils/mappers';

export const Products = () => {
	const { categoryId } = useParams();
	const { getProducts } = useProducts();
	const { removeFromCart, addToCart, cartProducts } = useCart();
	const [products, setProducts] = useState<ProductModel[]>([]);

	useEffect(() => {
		categoryId &&
			airtableBase(categoryId)
				.select({
					view: getAirtableView(categoryId),
				})
				.eachPage(records => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					return setProducts(mapData(records));
				});
	}, [categoryId, getProducts]);

	return (
		<>
			<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
				{products.length !== 0 ? (
					products.map((product: any) => {
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
					})
				) : (
					<SkeletonLoader />
				)}
			</Grid>
		</>
	);
};
