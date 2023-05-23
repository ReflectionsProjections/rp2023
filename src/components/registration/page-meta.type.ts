export interface PageMeta {
	[index: number]: {
		prev: number;
		next: number;
		title: string;
	};
}
