import { CategoryModel, ProductModel, RestaurantModel } from '../models/productModel';
import { isWorkingHour } from './restaurant';

export const mapCategoryData = (category: CategoryModel | undefined, products: ProductModel[]) => {
	return {
		Id: category?.Id,
		Flow: category?.Flow,
		FlowId: category?.FlowId,
		HeaderTitle: category?.HeaderTitle,
		HeaderImage: category?.HeaderImage,
		Products: category?.Products,
		Restaurants: category?.Restaurants?.map(restaurant => {
			return {
				...restaurant,
				Products: mapRecords(
					products.filter(product => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						return product.fields.Restaurants?.includes(restaurant.Id);
					}),
				),
			};
		}),
	};
};

export const mapCategories = (
	products: { fields: ProductModel }[],
	categories: { fields: CategoryModel }[],
	restaurants: { fields: RestaurantModel }[],
) => {
	return categories.map(category => {
		return {
			Id: category.fields.Id,
			Flow: category.fields.Flow,
			FlowId: category.fields.FlowId,
			HeaderTitle: category.fields.HeaderTitle,
			HeaderImage:
				category.fields.HeaderImage !== undefined
					? category.fields.HeaderImage.map(({ url }: { url: string }) => {
							return { url };
					  })
					: '',
			Products: mapRecords(
				products.filter(product => {
					return (
						product.fields.Category !== undefined &&
						category !== undefined &&
						product.fields.Category.includes(category.fields.Id)
					);
				}),
			),
			Restaurants: mapRecords(
				restaurants.filter(restaurant => {
					return (
						restaurant.fields.Category !== undefined &&
						category !== undefined &&
						restaurant.fields.Category.includes(category.fields.Id)
					);
				}),
			),
		};
	});
};

export const mapRestaurants = (products: { fields: ProductModel }[], restaurants: { fields: RestaurantModel }[]) => {
	return mapRecords(restaurants).map(restaurant => ({
		...restaurant,
		Products: mapRecords(
			products.filter(product => {
				return product.fields.Restaurants !== undefined
					? product.fields.Restaurants[0] === restaurant.Id
					: null;
			}),
		) as ProductModel[],
		WorkingTime: `${restaurant?.OpenTime} - ${restaurant?.CloseTime}`,
		IsWorking: isWorkingHour(restaurant?.OpenTime, restaurant?.CloseTime),
		WorkingStatus: isWorkingHour(restaurant?.OpenTime, restaurant?.CloseTime) ? 'Opened' : 'Closed',
	}));
};

export const mapRecords = (records: any[]) => {
	return records.map(item => {
		return item.fields;
	});
};

export const mapInfoBadges = (badge: string) => {
	switch (badge) {
		case 'ac': {
			return 'ac_unit';
		}
		case 'wifi': {
			return 'wifi';
		}
		case 'pool': {
			return 'pool';
		}
		case 'breakfast': {
			return 'restaurant';
		}
		case 'vegetarian': {
			return 'grass';
		}
		case 'spicy': {
			return 'local_fire_department';
		}
		case 'tv': {
			return 'tv';
		}
	}
};
