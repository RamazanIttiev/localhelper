// import { useLocalStorage } from 'usehooks-ts';
// import { setHaptic } from '../actions/webApp-actions';
// import { RestaurantProductModel } from '../pages/restaurant/components/restaurant-product/restaurant-product.model';
// import { CartItem } from '../models/cart.model';
//
// const incrementProductInCart = (products: RestaurantProductModel[], selectedProduct: RestaurantProductModel) => {
// 	return products.map(product => {
// 		return product.id === selectedProduct.id && product.amount !== undefined
// 			? { ...product, amount: product.amount + 1 }
// 			: product;
// 	});
// };
//
// const decrementProduct = (accumulator: RestaurantProductModel[], product: RestaurantProductModel) => {
// 	return [...accumulator, { ...product, amount: product.amount !== undefined ? product.amount - 1 : 0 }];
// };
//
// const addNewProductToCart = (products: RestaurantProductModel[], selectedProduct: RestaurantProductModel) => {
// 	return [...products, { ...selectedProduct, amount: 1 }];
// };
//
// const getProductFromCart = (
// 	cartProducts: RestaurantProductModel[],
// 	selectedProduct: RestaurantProductModel | undefined,
// ) => cartProducts.find(product => product.id === selectedProduct?.id);
//
// const checkProductInCart = (
// 	cartProducts: RestaurantProductModel[],
// 	selectedProduct: RestaurantProductModel | undefined,
// ) => Boolean(getProductFromCart(cartProducts, selectedProduct));
//
// export const getCartOrderString = (orderItems: string[]) =>
// 	`
// Ваш заказ:
//
// 			${JSON.stringify(orderItems, null, 2)}
//
// Доставка: 1 км = 100 Rs
// Способ оплаты: наличные`.replace(/\[|\]|"/g, '');
//
// export const useCart = () => {
// 	const [cartProducts, setCartProducts] = useLocalStorage<RestaurantProductModel[]>('products', []);
//
// 	const isCartEmpty = cartProducts.length === 0;
//
// 	const clearCart = () => {
// 		setCartProducts([]);
// 	};
//
// 	const getItemAmount = (id: string) => {
// 		return cartProducts.find(cartProduct => cartProduct.id === id)?.amount || 0;
// 	};
//
// 	const findCartItem = (id: string) => cartProducts.find(cartProduct => cartProduct.id === id);
//
// 	const addNewProduct = (product: CartItem) => {
// 		const cartItem = findCartItem(product.id);
// 		setCartProducts(currentItems => {
// 			if (cartItem === undefined) {
// 				return [...currentItems, { ...product }];
// 			} else
// 				return currentItems.flatMap(() => {
// 					if (cartItem.id === product.id) {
// 						return { ...cartItem, amount: cartItem.amount + product.amount };
// 					} else {
// 						return { ...product };
// 					}
// 				});
// 		});
// 	};
// 	const addToCart = (selectedProduct: RestaurantProductModel) => {
// 		setHaptic('light');
// 		setCartProducts(prevState => {
// 			if (checkProductInCart(prevState, selectedProduct)) {
// 				return incrementProductInCart(prevState, selectedProduct);
// 			} else {
// 				return addNewProductToCart(prevState, selectedProduct);
// 			}
// 		});
// 	};
//
// 	const removeFromCart = (selectedProduct: RestaurantProductModel) => {
// 		setHaptic('light');
// 		setCartProducts(prevState => {
// 			return prevState.reduce(
// 				(
// 					accumulator: [] | RestaurantProductModel[],
// 					product: RestaurantProductModel,
// 				): RestaurantProductModel[] => {
// 					if (product.id === selectedProduct.id) {
// 						if (product.amount === 1) {
// 							return accumulator;
// 						}
// 						return decrementProduct(accumulator, product);
// 					} else {
// 						return [...accumulator, product];
// 					}
// 				},
// 				[] as RestaurantProductModel[],
// 			);
// 		});
// 	};
//
// 	const findProduct = (id: string) =>
// 		cartProducts?.find(product => {
// 			return product.id === id;
// 		});
//
// 	return {
// 		cartProducts,
// 		addToCart,
// 		removeFromCart,
// 		clearCart,
// 		isCartEmpty,
// 		getItemAmount,
// 		findProduct,
// 	};
// };
export {};
