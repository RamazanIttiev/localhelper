import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ProductsHeader } from './productsHeader';
import { ProductContainer } from '../../components/product/product.container';
import { CategoryModel, ProductModel } from '../../models/product.model';

import { categoryQuery } from '../../api/airtable/category';
import { productsQuery } from '../../api/airtable/products';

export const Products = () => {
	const { categoryId } = useParams();

	const { data: category } = useQuery<CategoryModel>(categoryQuery(categoryId));
	const { data: products } = useQuery<ProductModel[]>(productsQuery(categoryId));

	const flowId = category?.flowId || '';

	return (
		<>
			<ProductsHeader category={category} />
			<Container sx={{ pt: 2 }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{products?.map((product: ProductModel) => {
						return (
							<Grid item xs={6} md={5} key={product.id}>
								<ProductContainer product={product} flowId={flowId} />
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</>
	);
};
