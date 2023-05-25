export interface PageMeta {
	[index: number]: {
		prev: (isCollegeStudent: boolean | undefined) => number;
		next: (isCollegeStudent: boolean | undefined) => number;
		title: string;
	};
}
