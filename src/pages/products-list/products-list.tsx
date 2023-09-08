import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

import { Category } from 'pages/categories/category.model';
import { Product } from 'pages/products-list/product/product.model';

import { HeaderSkeleton } from 'components/headerSkeleton';
import { ProductSkeleton } from 'components/productSkeleton';

import { categoryQuery } from 'api/airtable/category';
import { productsQuery } from 'api/airtable/products';

import { ProductContainer } from './product/product.container';
import { ProductsHeader } from './productsHeader';

export const ProductsList = () => {
	const { categoryId } = useParams();

	const { data: category } = useQuery<Category>(categoryQuery(categoryId));
	const { data: products } = useQuery<Product[]>(productsQuery(categoryId));

	const flowId = category?.flowId || '';

	return (
		<>
			{!category ? <HeaderSkeleton /> : <ProductsHeader category={category} />}
			<Container sx={{ pt: 2, pb: 6 }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{products ? (
						products.map((product: Product) => {
							return (
								<Grid item xs={6} md={5} key={product.id}>
									<ProductContainer product={product} flowId={flowId} />
								</Grid>
							);
						})
					) : (
						<ProductSkeleton />
					)}
				</Grid>
			</Container>
		</>
	);
};
