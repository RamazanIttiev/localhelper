import { useState } from 'react';
import { ProductModel } from '../models/productModel';

export const usePagination = (products: ProductModel[], productsPerPage: number) => {
	const [currentPage, setCurrentPage] = useState(1);
	const maxPage = Math.ceil(products.length / productsPerPage);

	const currentProducts = () => {
		const begin = (currentPage - 1) * productsPerPage;
		const end = begin + productsPerPage;
		return products.slice(begin, end);
	};

	const next = () => {
		setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
	};

	const prev = () => {
		setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
	};

	const jump = (page: number) => {
		const pageNumber = Math.max(1, page);
		setCurrentPage(Math.min(pageNumber, maxPage));
	};

	return { next, prev, jump, currentProducts, currentPage, maxPage };
};
