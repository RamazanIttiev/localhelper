import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ServiceUI } from './service.component';
import { useReactRouter } from '../../hooks/useReactRouter';
import { useCart } from '../../pages/cart/hooks/useCart';
import { handleMainButton, hideMainButton, setMainButtonText, showMainButton } from '../../actions/webApp-actions';

export const ServiceContainer = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { isCartEmpty } = useCart();
	const { isServiceRoute } = useReactRouter();

	useEffect(() => {
		if (isServiceRoute && !isCartEmpty) {
			showMainButton();
			setMainButtonText('Order');
		} else hideMainButton();

		return () => hideMainButton();
	}, [isServiceRoute, isCartEmpty]);

	useEffect(() => {
		handleMainButton(() => navigate('/services/food/shopping-cart'));
	}, [navigate, state.title]);

	return <ServiceUI service={state} />;
};
