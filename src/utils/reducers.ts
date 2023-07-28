import { ErrorType } from '../models/error.model';

interface State {
	loading: boolean;
	errorState: ErrorType;
}

export enum Actions {
	START_LOADING = 'START_LOADING',
	STOP_LOADING = 'STOP_LOADING',
	SET_ERROR = 'SET_ERROR',
	CLEAR_ERROR = 'CLEAR_ERROR',
}

type Action =
	| { type: Actions.START_LOADING }
	| { type: Actions.STOP_LOADING }
	| { type: Actions.SET_ERROR; payload: ErrorType }
	| { type: Actions.CLEAR_ERROR };

export const initialState: State = {
	loading: false,
	errorState: { isError: null },
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case Actions.START_LOADING:
			return { ...state, loading: true };
		case Actions.STOP_LOADING:
			return { ...state, loading: false };
		case Actions.SET_ERROR:
			return { ...state, errorState: action.payload };
		case Actions.CLEAR_ERROR:
			return { ...state, errorState: { isError: null } };
		default:
			return state;
	}
};
