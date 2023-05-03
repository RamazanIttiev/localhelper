import { AppData } from '../models/productModel';
import { mapCategoryData } from '../utils/mappers';
import { useOutletContext, useParams } from 'react-router-dom';

export const useCategory = () => {
	const params = useParams();
	const appData = useOutletContext<AppData>();

	const category = mapCategoryData(
		appData?.resolvedCategories?.find(category => category.Flow.toLowerCase() === params?.categoryId),
		appData?.resolvedProducts,
	);

	const flowId = category.FlowId !== undefined ? category.FlowId : '';

	return {
		flowId,
		category,
		products: category?.Products,
	};
};
