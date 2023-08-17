export type PageIndex =
	| 'none'
	| 'welcome'
	| 'academics'
	| 'demographics'
	| 'dietaryRestrictions'
	| 'recruitment'
	| 'specialEvents'
	| 'marketing'
	| 'emailVerification';

export interface PageMeta {
	[index: string]: {
		prev: (isCollegeStudent: boolean | undefined) => PageIndex;
		next: (isCollegeStudent: boolean | undefined) => PageIndex;
		title: string;
		requiredFields: string[];
	};
}
