import { CategoryModel } from '../models/categories';
import food from '../../../assets/food.jpg';
import flowers from '../../../assets/flowers.jpg';
import rent from '../../../assets/rent.jpg';
import tours from '../../../assets/tours.jpg';
import transport from '../../../assets/transport.jpg';

export const categories: CategoryModel[] = [
	{ title: 'Food', image: food },
	{ title: 'Transport', image: transport },
	{ title: 'Rent', image: rent },
	{ title: 'Flowers', image: flowers },
	{ title: 'Tours', image: tours },
];
