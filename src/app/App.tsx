import React, { useCallback, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Airtable from 'airtable';
import { Info } from '../views/info';
import { Container } from '@mui/material';
import { Products } from '../views/products';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Categories } from '../views/categories';
import { ProductDetails } from '../views/productDetails';
import { ProductModel } from '../models/productModel';

export const airtableBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_PRIVATE_KEY,
}).base('appN5D5g87uz2gY2j');

export const App = () => {
	const { pathname } = useLocation();
	const [products, setProducts] = useState<ProductModel[]>([]);

	const handleProducts = useCallback((value: ProductModel[]) => {
		setProducts(value);
	}, []);

	return (
		<div className="App">
			{pathname !== '/' && <Header />}

			<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
				<Routes>
					<Route path="/" element={<Categories />} />

					<Route
						path=":categoryId"
						element={<Products products={products} handleProducts={handleProducts} />}
					/>
					<Route path=":categoryId/:productId" element={<ProductDetails products={products} />} />

					<Route path="info" element={<Info />} />
				</Routes>
			</Container>
			<Footer />
			{/*{isCartOpened && (*/}
			{/*	<CartContainer*/}
			{/*		cart={cart}*/}
			{/*		isCartOpened={isCartOpened}*/}
			{/*		toggleCart={toggleCart}*/}
			{/*		addToCart={addToCart}*/}
			{/*		removeFromCart={removeFromCart}*/}
			{/*	/>*/}
			{/*)}*/}
		</div>
	);
};
