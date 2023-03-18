import { CategoryModel } from '../models/categories';

import food from '../assets/food.jpg';
import flowers from '../assets/flowers.jpg';
import rent from '../assets/rent.jpg';
import tours from '../assets/tours.jpg';

export const categories: CategoryModel[] = [
	{ title: 'Food', image: food },
	{ title: 'Flowers', image: flowers },
	{ title: 'Rent', image: rent },
	{ title: 'Tours', image: tours },
];
