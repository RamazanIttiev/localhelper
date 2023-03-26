import React from 'react';

import { Layout } from '../views/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProductModel } from '../models/productModel';

export const App = () => {
	// const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);

	const handleSelectedProduct = (product: ProductModel | null) => {
		// setSelectedProduct(product);
		console.log(product);
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout handleSelectedProduct={handleSelectedProduct} />,
			children: [
				{
					path: 'categories/:category',
					element: <Layout handleSelectedProduct={handleSelectedProduct} />,
				},
			],
		},
		// {
		// 	path: 'categories/:category/:product',
		// 	element: <ProductDetails selectedProduct={selectedProduct} />,
		// },
	]);

	return <RouterProvider router={router} />;
};
