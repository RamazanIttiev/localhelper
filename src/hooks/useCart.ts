import { useLocalStorage } from 'usehooks-ts';
import { hideMainButton, setHaptic } from '../actions/webApp-actions';
import { useProducts } from './useProducts';
import { ProductModel } from '../models/productModel';
import { addNewProductToCart, decrementProduct, incrementProductInCart } from '../utils/cart';

export const useCart = () => {
	const { checkProductInCart, isSameRestaurant } = useProducts();
	const [cartProducts, setCartProducts] = useLocalStorage<ProductModel[]>('products', []);

	const isCartEmpty = cartProducts.length === 0;

	const clearCart = () => {
		setCartProducts([]);
	};

	const addToCart = (selectedProduct: ProductModel) => {
		setHaptic('light');
		const sameRestaurant = isSameRestaurant(cartProducts, selectedProduct);

		const setCart = () =>
			setCartProducts(prevState => {
				if (checkProductInCart(prevState, selectedProduct)) {
					return incrementProductInCart(prevState, selectedProduct);
				} else {
					return addNewProductToCart(prevState, selectedProduct);
				}
			});

		if (!sameRestaurant) {
			const answer = confirm('You should empty your cart for a new order');
			answer && clearCart();

			setTimeout(() => setCart(), 0);
		} else {
			setCart();
		}
	};

	const removeFromCart = (selectedProduct: ProductModel) => {
		setHaptic('light');
		setCartProducts(prevState => {
			return prevState.reduce((accumulator: [] | ProductModel[], product: ProductModel): ProductModel[] => {
				if (product.id === selectedProduct.id) {
					if (product.amount! === 1) {
						return accumulator;
					}
					return decrementProduct(accumulator, product);
				} else {
					return [...accumulator, product];
				}
			}, [] as ProductModel[]);
		});

		if (cartProducts.length === 1) {
			const answer = confirm('Do you want to clear your cart?');
			if (answer) {
				clearCart();
				hideMainButton();
			}
		}
	};

	return {
		cartProducts,
		addToCart,
		removeFromCart,
		clearCart,
		isCartEmpty,
	};
};
