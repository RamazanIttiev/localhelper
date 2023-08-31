import { useQuery } from '@tanstack/react-query';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

import { HeaderSkeleton } from 'components/headerSkeleton';
import { ProductSkeleton } from 'components/productSkeleton';

import { CategoryModel, ProductModel } from 'models/product.model';

import { categoryQuery } from 'api/airtable/category';
import { productsQuery } from 'api/airtable/products';

import { ProductContainer } from './product/product.container';
import { ProductsHeader } from './productsHeader';

export const ProductsList = () => {
	const { categoryId } = useParams();

	const { data: category } = useQuery<CategoryModel>(categoryQuery(categoryId));
	const { data: products } = useQuery<ProductModel[]>(productsQuery(categoryId));

	const flowId = category?.flowId || '';

	return (
		<>
			{!category ? <HeaderSkeleton /> : <ProductsHeader category={category} />}
			<Container sx={{ pt: 2 }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{products ? (
						products.map((product: ProductModel) => {
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
