import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';

interface ShoppingCartProps {
	cart: ProductModel[] | [];
}
export const ShoppingCart: FC<ShoppingCartProps> = ({ cart }) => {
	return (
		<div>
			{cart?.map(({ title, amount }) => {
				return `${title}: ${amount}`;
			})}
		</div>
	);
};
