import { createContext, ReactNode, useContext } from 'react';

import { fetchTelegramUser } from 'actions/webApp-actions';

interface TelegramUser {
	allows_write_to_pm: boolean;
	first_name: string;
	id: number;
	language_code: string;
	last_name: string;
	username: string;
}

const UserContext = createContext({} as TelegramUser);

export const useTelegramUser = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const user = fetchTelegramUser();

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
