import { sendWebAppDeepLink } from 'api/telegram.ts';

// TODO Fix types
export const handleOrder = async (flowId: string, order: any) => {
	try {
		const { result } = await sendWebAppDeepLink(flowId, order);

		return result;
	} catch (error) {
		console.log(error);
	}
};
