import { CategoryModel } from '../models/categories';

import food from '../assets/food.gif';
import flowers from '../assets/flowers.gif';
import rent from '../assets/rent.gif';
import tours from '../assets/tours.gif';

export const categories: CategoryModel[] = [
	{ title: 'Food', image: food },
	{ title: 'Flowers', image: flowers },
	{ title: 'Rent', image: rent },
	{ title: 'Tours', image: tours },
];
