type Validator<T> = (key: T) => string | null;

type FormValidators = {
	// Sorry typescript gods but I had my reasons
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: Validator<any>;
};

export const formValidators: FormValidators = {
	// --- WELCOME ---
	name: (name: string): string | null => {
		name = name.trim();
		if (name.length < 2 || name.length > 100) {
			return 'Name must be between 2 and 100 characters';
		}
		return null;
	},
	email: (email: string): string | null => {
		email = email.trim();
		// Basic regex for validating emails. NOT RFC2822 compliant, but will not have any false negatives.
		// Philosophy: Best way to validate an email is by sending a verification token to it.
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!regex.test(email)) return 'This is not a valid email';
		return null;
	},
	// These are managed by our svelte components
	isCollegeStudent: () => null,
	isUIUCStudent: () => null,
	// --- ACADEMICS ---
	major: (major: string) => {
		major = major.trim();
		if (major.length == 0 || major === 'N/A') return 'Major is required';
		if (major.length > 50) return 'Major cannot be over 50 characters';
		return null;
	},
	majorOther: (major: string | null) => {
		if (major == null) return null;
		major = major.trim();
		if (major.length > 50) return 'Other Major cannot be over 50 characters';
		return null;
	},
	collegeName: (college: string) => {
		college = college.trim();
		if (college.length == 0) return 'College is required';
		if (college.length > 100) return 'College Name cannot be over 100 characters';
		return null;
	},
	expectedGradTerm: (term: string) => {
		if (term.length == 0) return 'Grad Term is required';
		return null;
	},
	gradYear: () => null,
	// Completely optional
	firstGen: () => null,
	// --- DEMOGRAPHIC INFO ---
	// All fields Completely optional
	age: (age: number) => {
		if (age < 0) return "Unless you're from the future, age must be positive";
		if (age > 116) return 'You just broke the world record for oldest person in the world!';
		return null;
	},
	gender: () => null,
	ethnicity: () => null,
	race: () => null,
	raceOther: (raceOther: string | null) => {
		if (!raceOther) return null;
		if (raceOther.length > 30) return 'This cannot be over 30 characters';
		return null;
	},
	// --- DIETARY RESTRICTIONS ---
	food: (food: string) => {
		if (food.length == 0) return 'This is required';
		return null;
	},
	// --- CAREER ---
	jobTypeInterest: () => null,
	portfolioLink: (link: string | null) => {
		if (!link) return null;
		if (link.length > 200) return 'link cannot be over 200 characters';
		return null;
	},
	// --- SPECIAL EVENTS ---
	mechPuzzle: () => null,
	marketing: () => null,
	marketingOther: (marketingOther: string | null) => {
		if (!marketingOther) return null;
		if (marketingOther.length > 30) return 'This cannot be over 30 characters';
		return null;
	},
	passcode: (passcode: string): string | null => {
		passcode = passcode.trim();
		// Basic regex for validating emails. NOT RFC2822 compliant, but will not have any false negatives.
		// Philosophy: Best way to validate an email is by sending a verification token to it.
		const regex = /^\d{6}$/;
		if (!regex.test(passcode)) return 'Passcode must be six digits';
		return null;
	}
};
