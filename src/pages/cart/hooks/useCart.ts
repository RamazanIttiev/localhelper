import { useLocalStorage } from 'usehooks-ts';
import { setHaptic, showConfirmation } from '../../../actions/webApp-actions';
import { useProducts } from '../../products/hooks/useProducts';
import { ProductModel } from '../../../models/productModel';
import { addNewProductToCart, decrementProduct, incrementProductInCart } from '../utils/cart.utlis';

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
			const userAnswer = showConfirmation('You should empty your cart for a new order', answer => answer);

			const answer = confirm('You should empty your cart for a new order');
			answer && clearCart();
			userAnswer && clearCart();

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
	};

	return {
		cartProducts,
		addToCart,
		removeFromCart,
		clearCart,
		isCartEmpty,
	};
};
