import { CategoryModel } from '../models/categories';
import food from '../../../assets/food.webp';
import flowers from '../../../assets/flowers.webp';
import rent from '../../../assets/rent.webp';
import tours from '../../../assets/tours.webp';
import transport from '../../../assets/transport.webp';

export const categories: CategoryModel[] = [
	{ title: 'Food', image: food },
	{ title: 'Transport', image: transport },
	{ title: 'Rent', image: rent },
	{ title: 'Flowers', image: flowers },
	{ title: 'Tours', image: tours },
];
