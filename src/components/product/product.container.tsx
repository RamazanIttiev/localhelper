import React, { FC, useEffect, useState } from 'react';
import { ProductComponent } from './product.component';
import { useProducts } from '../../pages/products/hooks/useProducts';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ErrorType } from '../../models/error';
import { clearResponseMessage } from '../../actions/global-actions';
import { getAirtableView } from '../../utils/airtable';
import { ProductModel } from '../../models/productModel';

interface ProductContainerProps {
	product: ProductModel;
	cartProducts: ProductModel[];
	amountButtonsVisible?: boolean;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const ProductContainer: FC<ProductContainerProps> = ({
	product,
	addToCart,
	cartProducts,
	removeFromCart,
	amountButtonsVisible,
}) => {
	const { productsRoute } = useReactRouter();
	const { getProductFromCart } = useProducts();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const productFromCart = getProductFromCart(cartProducts, product);

	const idForBot = getAirtableView(productsRoute?.params.categoryId);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	return (
		<ProductComponent
			product={product}
			loading={loading}
			idForBot={idForBot}
			addToCart={addToCart}
			errorState={errorState}
			handleError={handleError}
			handleLoading={handleLoading}
			removeFromCart={removeFromCart}
			productFromCart={productFromCart}
			amountButtonsVisible={amountButtonsVisible}
		/>
	);
};
