import React, { FC, useEffect, useState } from 'react';

import Airtable from 'airtable';

import { useLocation, useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import { useAirtableView } from '../hooks';
import { mapData } from '../utils/mappers';

import { ProductModel } from '../models/productModel';

import { Home } from './home';
import { Products } from './products';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
// import { CartContainer } from '../views/cart/cart.container';

// import {
// 	addNewProductToCart,
// 	decrementProduct,
// 	incrementProductInCart,
// 	isProductInCart,
// 	removeProductFromCart,
// } from '../utils/cart';

const airtableBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_PRIVATE_KEY,
}).base('appN5D5g87uz2gY2j');

interface LayoutProps {
	handleSelectedProduct: (selectedProduct: ProductModel | null) => void;
}

export const Layout: FC<LayoutProps> = ({ handleSelectedProduct }) => {
	const { category } = useParams();
	const { pathname } = useLocation();
	const airtableView = useAirtableView(category);
	// const [isCartOpened, setOpenCart] = useState(false);
	const [products, setProducts] = useState<ProductModel[]>([]);
	// const [cart, setCart] = useState<ProductModel[] | []>(JSON.parse(localStorage.getItem('products') || '[]'));

	useEffect(() => {
		category &&
			pathname !== '/' &&
			airtableBase(category)
				.select({
					view: airtableView,
				})
				.eachPage(records => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					return setProducts(mapData(records));
				});

		return () => {
			setProducts([]);
		};
	}, [pathname, airtableView, category]);

	// const toggleCart = () => {
	// 	setOpenCart(!isCartOpened);
	// };

	// const addToCart = (selectedProduct: ProductModel) => {
	// 	setCart(prevState => {
	// 		if (isProductInCart(prevState, selectedProduct)) {
	// 			return incrementProductInCart(prevState, selectedProduct);
	// 		} else {
	// 			return addNewProductToCart(prevState, selectedProduct);
	// 		}
	// 	});
	// };
	//
	// const removeFromCart = (selectedProduct: ProductModel) => {
	// 	setCart(prevState => {
	// 		return (prevState as ProductModel[]).reduce(
	// 			(accumulator: [] | ProductModel[], product: ProductModel): ProductModel[] => {
	// 				if (product.id === selectedProduct.id) {
	// 					if (product.amount === 1) return removeProductFromCart(accumulator);
	// 					return decrementProduct(accumulator, product);
	// 				} else {
	// 					return [...accumulator, product];
	// 				}
	// 			},
	// 			[] as ProductModel[],
	// 		);
	// 	});
	// };

	return (
		<div className="App">
			{pathname !== '/' && <Header />}
			<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
				{pathname === '/' ? (
					<Home />
				) : (
					<Products products={products} handleSelectedProduct={handleSelectedProduct} />
				)}
			</Container>
			<Footer />
			{/*<Routes>*/}
			{/*	<Route path="/categories/:category/:product">*/}
			{/*		<ProductDetails products={products} />*/}
			{/*	</Route>*/}
			{/*</Routes>*/}

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
