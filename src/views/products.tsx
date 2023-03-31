import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useAirtableData } from '../hooks';
import { Product } from '../components/product';
import { useParams } from 'react-router-dom';
import { SkeletonLoader } from '../components/skeletonLoader';

interface ProductsProps {
	// cart: Product[];
	// removeFromCart: (product: Product) => void;
	// addToCart: (selectedProduct: Product) => void;
}

export const Products: FC<ProductsProps> = () => {
	const { categoryId } = useParams();
	// const [isCartOpened, setOpenCart] = useState(false);
	// const [cart, setCart] = useState<Product[] | []>(JSON.parse(localStorage.getItem('products') || '[]'));
	const products = useAirtableData(categoryId);

	return (
		<>
			<Grid container spacing={2} sx={{ pt: 3, justifyContent: 'center' }}>
				{products.length !== 0 ? (
					products.map((product: any) => {
						return (
							<Grid item xs={6} md={5} key={product.id}>
								<Product
									product={product}
									// cart={cart}
									// addToCart={addToCart}
									// removeFromCart={removeFromCart}
								/>
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
