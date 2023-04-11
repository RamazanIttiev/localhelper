import { useLocalStorage } from 'usehooks-ts';
import { setHaptic } from '../../../actions/global-actions';
import { useProducts } from '../../products/hooks/useProducts';
import { ProductModel } from '../../productDetails/models/productModel';
import { addNewProductToCart, decrementProduct, incrementProductInCart } from '../utils/cart.utlis';

export const useCart = () => {
	const { checkProductInCart } = useProducts();
	const [cartProducts, setCartProducts] = useLocalStorage<ProductModel[]>('products', []);

	const isCartEmpty = cartProducts.length === 0;

	const clearCart = () => {
		setCartProducts([]);
	};

	const addToCart = (selectedProduct: ProductModel) => {
		setHaptic('light');
		setCartProducts(prevState => {
			if (checkProductInCart(prevState, selectedProduct)) {
				return incrementProductInCart(prevState, selectedProduct);
			} else {
				return addNewProductToCart(prevState, selectedProduct);
			}
		});
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
