import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { FormUI } from './components/form.component';
import { Container, Switch, useTheme } from '@mui/material';
import { OrderInfo } from './components/orderInfo';
import { SaveInfoField, SaveInfoWrapper } from './checkout.styled';
import { handleFormSubmit } from '../../actions/global-actions';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CartList } from '../cart/cart-list';
import { UserData, UserDB } from '../../models/user.model';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { HintTitle } from '../../components/hintTitle';
import { useShoppingCart } from '../../context/cart.context';
import { AppData } from '../../models/product.model';
import { fetchUser, saveUserInfo } from '../../api/user';
import { initialState, reducer } from '../../utils/reducers';
import { useMainButton } from '../../hooks/useMainButton';

interface RouteState {
	state: { flowId: string; placeTitle: string; placeNumber: string; placeLocation: string; placeCoordinates: string };
}

export const CheckoutContainer = () => {
	const navigate = useNavigate();
	const { state } = useLocation() as RouteState;
	const flowId = state.flowId || '';

	const theme = useTheme();
	const { products } = useOutletContext<AppData>();
	const { getCartTotalAmount, getCartOrder, clearCart } = useShoppingCart();

	const [{ loading, errorState }, dispatch] = useReducer(reducer, initialState);

	const cartOrder = getCartOrder(products);
	const cartTotalAmount = getCartTotalAmount(products);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserData>();

	const [user, setUser] = useState<UserDB | undefined>();
	const [saveInfo, setSaveInfo] = useState(true);

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

	const onSubmit = useCallback(
		(userData?: UserData) => {
			return handleFormSubmit(dispatch, flowId, {
				...state,
				...userData,
				order: cartOrder,
				orderTotal: cartTotalAmount,
			}).then(response => {
				if (response?.ok) {
					userData !== undefined && saveInfo && !user && saveUserInfo(userData);
					setTimeout(() => {
						clearCart();
						navigate(-1);
					}, 2000);
				}
			});
		},
		[flowId, state, cartOrder, cartTotalAmount, saveInfo, user, clearCart, navigate],
	);

	const handleForm = async () => {
		try {
			await handleSubmit(onSubmit)();
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	useMainButton({ handleClick: handleForm, dispatch, errorState, buttonLabel: 'order' });

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<FormUI
				errors={errors}
				loading={loading}
				register={register}
				handleForm={handleForm}
				errorState={errorState}
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
