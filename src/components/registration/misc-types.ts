export type unanswered = 'preferNotToSay';

export type genderOptions = 'male' | 'female' | 'nonbinary' | unanswered;

export type ethnicityOptions = 'hispanicOrLatino' | 'notHispanicOrLatino' | unanswered;

export type firstGenOptions = boolStr | unanswered;

export type extraEventOptions = 'mechmania' | 'puzzlebang';

export type raceOptions =
	| 'americanIndianOrAlaska'
	| 'eastAsian'
	| 'southAsian'
	| 'black'
	| 'pacificIslander'
	| 'white';

export type boolStr = 'yes' | 'no';

export type jobTypeOptions = 'full-time' | 'internship' | 'co-op' | unanswered;

export type majorOptions = 'cs' | 'cs+stats' | 'cs+math' | 'cs+x';
