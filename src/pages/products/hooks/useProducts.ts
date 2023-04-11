import { useCallback, useState } from 'react';
import { airtableBase } from '../../../app/App';
import { mapData } from '../../../utils/mappers';
import { getAirtableView } from '../../../utils/airtable';
import { ProductModel } from '../../productDetails/models/productModel';

export const useProducts = () => {
	const [products, setProducts] = useState<ProductModel[]>([]);

	const getProducts = useCallback(
		(categoryId: string | undefined) => {
			categoryId &&
				airtableBase(categoryId)
					.select({
						view: getAirtableView(categoryId),
					})
					.eachPage(records => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						return setProducts(mapData(records));
					});
			return products;
		},
		[products],
	);

	const getProductFromCart = (cartProducts: ProductModel[], selectedProduct: ProductModel | undefined) =>
		cartProducts.find(product => product.id === selectedProduct?.id);

	const checkProductInCart = (cartProducts: ProductModel[], selectedProduct: ProductModel | undefined) =>
		Boolean(getProductFromCart(cartProducts, selectedProduct));

	return { getProducts, checkProductInCart, getProductFromCart };
};
