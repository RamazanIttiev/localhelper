import React, { FC } from 'react';
import { ProductModel } from '../models/cardModel';

interface ShoppingCartProps {
	cart: ProductModel[] | [];
}
export const ShoppingCart: FC<ShoppingCartProps> = ({ cart }) => {
	return (
		<div>
			{cart.map(({ title, quantity }) => {
				return `${title}: ${quantity}`;
			})}
		</div>
	);
};
