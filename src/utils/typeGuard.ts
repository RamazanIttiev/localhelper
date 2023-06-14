import { FoodModel, ProductModel } from '../models/product.model';
import { GeoProps, OpenCageGeoProps } from '../models/geolocation.model';

export const isFood = (product?: ProductModel): product is FoodModel => {
	return (product as FoodModel) !== undefined;
};

export const isGeo = (geo?: GeoProps | OpenCageGeoProps | string): geo is GeoProps => {
	return (geo as GeoProps) !== undefined;
};
