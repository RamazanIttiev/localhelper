export interface Feed {
	id: string;
	title: string;
	place: string;
	description: string;
	image: { url: string }[];
	date: string;
}
