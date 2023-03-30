import React, { FC, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Product } from '../components/product';
import { ProductModel } from '../models/productModel';
import { SkeletonLoader } from '../components/skeletonLoader';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAirtableView } from '../hooks';
import { mapData } from '../utils/mappers';
import { airtableBase } from '../app/App';

interface ProductsProps {
	products: ProductModel[];
	handleProducts: (value: ProductModel[]) => void;
	// cart: ProductModel[];
	// removeFromCart: (product: ProductModel) => void;
	// addToCart: (selectedProduct: ProductModel) => void;
}

export const Products: FC<ProductsProps> = ({ products, handleProducts }) => {
	const { categoryId } = useParams();
	const { pathname } = useLocation();
	const airtableView = useAirtableView(categoryId);
	// const [isCartOpened, setOpenCart] = useState(false);
	// const [cart, setCart] = useState<ProductModel[] | []>(JSON.parse(localStorage.getItem('products') || '[]'));

	useEffect(() => {
		categoryId &&
			pathname !== '/' &&
			airtableBase(categoryId)
				.select({
					view: airtableView,
				})
				.eachPage(records => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					return handleProducts(mapData(records));
				});
		return () => {
			handleProducts([]);
		};
	}, [handleProducts, pathname, airtableView, categoryId]);

	return (
		<>
			<Grid container spacing={2} sx={{ pt: 3, justifyContent: 'center' }}>
				{products.length !== 0 ? (
					products.map((product: any) => {
						return (
							<Grid item xs={6} md={5} key={product.id}>
								<Link to={product.title.toLowerCase()}>
									<Product
										product={product}
										// cart={cart}
										// addToCart={addToCart}
										// removeFromCart={removeFromCart}
									/>
								</Link>
							</Grid>
						);
					})
				) : (
					<SkeletonLoader />
				)}
			</Grid>
		</>
	);
};
