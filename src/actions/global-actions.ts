import { ErrorType } from 'models/error.model';

import { sendWebAppDeepLink } from 'api/telegram';

export const handleOrder = async (
	flowId: string,
	order: any,
	handleLoading: (value: boolean) => void,
	handleError: (value: ErrorType) => void,
) => {
	handleLoading(true);
	try {
		const { result } = await sendWebAppDeepLink(flowId, order);
		if (result.ok) {
			handleLoading(false);
			handleError({ isError: false });
		} else {
			handleLoading(false);
			handleError({
				isError: true,
			});
		}
		return result;
	} catch (error) {
		handleLoading(false);
		handleError({
			isError: true,
		});
	}
};
