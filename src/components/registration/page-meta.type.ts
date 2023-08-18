export type PageIndex =
	| 'none'
	| 'welcome'
	| 'academics'
	| 'demographics'
	| 'dietaryRestrictions'
	| 'recruitment'
	| 'specialEvents'
	| 'marketing'
	| 'emailVerification'
	| 'finalPage';

export interface PageMeta {
	[index: string]: {
		prev: (isCollegeStudent: boolean | undefined) => PageIndex;
		next: (isCollegeStudent: boolean | undefined) => PageIndex;
		title: string;
		fields: string[];
	};
}
