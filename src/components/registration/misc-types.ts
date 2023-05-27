export type unanswered = 'preferNotToSay';

export type genderOptions = 'male' | 'female' | 'nonbinary' | unanswered;

export type ethnicityOptions = 'hispanicOrLatino' | 'notHispanicOrLatino' | unanswered;

export type firstGenOptions = boolStr | unanswered;

export type raceOptions =
	| 'americanIndianOrAlaska'
	| 'eastAsian'
	| 'southAsian'
	| 'black'
	| 'pacificIslander'
	| 'white';

export type boolStr = 'yes' | 'no';
