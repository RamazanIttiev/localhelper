import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAirtableView } from '../hooks';
import { ProductModel } from '../models/productModel';
import { mapFoodData } from '../services/mappers';
import { Header } from './header';
import { BottomNavigation, BottomNavigationAction, Container, Icon } from '@mui/material';
import { Home } from './home';
import { Categories } from './categories';
import Airtable from 'airtable';
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
	const [activeButton, setActiveButton] = React.useState(0);
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
					return setProducts(mapFoodData(records));
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
			<Header />
			<Container sx={{ pt: 2, pb: 9 }}>
				{pathname === '/' ? (
					<Home />
				) : (
					<Categories products={products} handleSelectedProduct={handleSelectedProduct} />
				)}
			</Container>
			<BottomNavigation
				sx={{ background: '#ff335f', position: 'fixed', width: '100%', bottom: 0, height: '42px' }}
				showLabels
				value={activeButton}
				onChange={(event, newValue) => {
					setActiveButton(newValue);
				}}>
				<BottomNavigationAction
					label="Categories"
					icon={
						<Icon sx={{ color: '#fff' }} fontSize={'small'}>
							category
						</Icon>
					}
					component={Link}
					to={'/'}
				/>
			</BottomNavigation>
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
