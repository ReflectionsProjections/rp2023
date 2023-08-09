interface Event {
	_id: string;
	name: string;
	description: string;
	start_time: string;
	duration: number;
	location: string;
	virtual: boolean;
	upgrade: boolean;
	visible: boolean;
}

interface User {
	email: string;
	fullName?: string;
}

export type { Event, User };
