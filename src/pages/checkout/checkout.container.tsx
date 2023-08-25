import React, { useCallback, useEffect, useState } from 'react';
import { FormUI } from './components/form.component';
import { Container, Switch, useTheme } from '@mui/material';
import { OrderInfo } from './components/orderInfo';
import { SaveInfoField, SaveInfoWrapper } from './checkout.styled';
import { ErrorType } from '../../models/error.model';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useForm } from 'react-hook-form';
import { CartList } from '../cart/components/cart-list';
import { UserData, UserDB } from '../../models/user.model';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { HintTitle } from '../../components/hintTitle';
import { useShoppingCart } from '../../context/cart.context';
import { fetchUser, saveUserInfo } from '../../api/user';
import { useQuery } from '@tanstack/react-query';
import { restaurantProductsQuery } from '../../api/airtable/restaurant';
import { RestaurantProductModel } from '../restaurant/components/restaurant-product/restaurant-product.model';

export const CheckoutContainer = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const theme = useTheme();

	const { restaurantId } = useParams();

	const { data: products } = useQuery<RestaurantProductModel[]>(restaurantProductsQuery(restaurantId));

	const { getCartTotalAmount, getCartOrder, clearCart } = useShoppingCart();

	const cartOrder = products ? getCartOrder(products) : '';
	const cartTotalAmount = products ? getCartTotalAmount(products) : 1;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserData>();

	const [user, setUser] = useState<UserDB | undefined>();
	const [loading, setLoading] = useState(false);
	const [saveInfo, setSaveInfo] = useState(true);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	const handleSaveInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSaveInfo(event.target.checked);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const user = await fetchUser();
				setUser(user);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData().catch(error => error);
	}, []);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const produceOrder = useCallback(
		(userData?: UserData) => {
			return handleOrder(
				state?.flowId,
				{
					...state,
					...userData,
					order: cartOrder,
					orderTotal: cartTotalAmount,
				},
				handleLoading,
				handleError,
			).then(response => {
				if (response?.ok) {
					userData !== undefined && saveInfo && !user && saveUserInfo(userData);
					setTimeout(() => {
						clearCart();
						navigate(-1);
					}, 2000);
				}
			});
		},
		[state, cartOrder, cartTotalAmount, saveInfo, user, clearCart, navigate],
	);

	const handleFormOrder = async () => {
		try {
			await handleSubmit(produceOrder)();
		} catch (error) {
			// Handle any errors that occur during form submission
			console.error('Error submitting form:', error);
		}
	};

	useEffect(() => {
		showMainButton();
		setMainButtonText('Order');

		const handleOrder = async () => {
			try {
				await handleSubmit(produceOrder)();
			} catch (error) {
				// Handle any errors that occur during form submission
				console.error('Error submitting form:', error);
			}
		};

		handleMainButton(handleOrder);

		return () => {
			removeMainButtonEvent(handleOrder);
		};
	}, [handleSubmit, produceOrder]);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<FormUI
				errors={errors}
				loading={loading}
				register={register}
				onSubmit={handleFormOrder}
				errorState={errorState}
				handleSubmit={handleSubmit}
			/>
			{isUserAgentTelegram && (
				<SaveInfoWrapper>
					<SaveInfoField
						control={
							<Switch
								checked={saveInfo}
								onChange={handleSaveInfo}
								sx={{ color: theme.palette.primary.main }}
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						labelPlacement={'start'}
						label="Save info"
					/>
					<HintTitle styles={{ marginTop: '0.5rem' }} text={'Save contact information for future orders'} />
				</SaveInfoWrapper>
			)}

			<HintTitle
				styles={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
				text={`Your order from ${state?.placeTitle}`}
			/>
			<CartList />
			<OrderInfo orderTotal={cartTotalAmount} />
		</Container>
	);
};
