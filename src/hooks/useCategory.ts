import { AppData } from '../models/productModel';
import { useOutletContext, useParams } from 'react-router-dom';

export const useCategory = () => {
	const { categoryId } = useParams();
	const { categories } = useOutletContext<AppData>();

	const category = categories.find(category => category.Flow.toLowerCase() === categoryId);

	const flowId = category?.FlowId !== undefined ? category.FlowId : '';

	return {
		flowId,
		category,
	};
};
