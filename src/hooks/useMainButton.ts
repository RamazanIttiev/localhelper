import { Dispatch, useEffect } from 'react';
import { Actions } from '../utils/reducers';
import { ErrorType } from '../models/error.model';
import { clearResponseMessage } from '../actions/global-actions';
import { handleMainButton, removeMainButtonEvent, setMainButtonText, showMainButton } from '../actions/webApp-actions';

interface Props {
	handleClick: () => Promise<void> | void;
	dispatch?: Dispatch<any>;
	errorState?: ErrorType;
	buttonLabel: string;
}

export const useMainButton = ({ handleClick, dispatch, errorState, buttonLabel }: Props) => {
	useEffect(() => {
		showMainButton();
		setMainButtonText(buttonLabel);

		handleMainButton(handleClick);

		return () => {
			removeMainButtonEvent(handleClick);
		};
	}, [buttonLabel, handleClick]);

	useEffect(() => {
		if (errorState) {
			if (errorState.isError !== null) {
				clearResponseMessage(
					errorState,
					(value: ErrorType) => dispatch && dispatch({ type: Actions.SET_ERROR, payload: value }),
				);
			}
		}
	}, [errorState, dispatch]);
};
