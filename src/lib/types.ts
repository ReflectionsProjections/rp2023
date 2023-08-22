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

type Role = {
	_id: string;
	email: string;
	role: string;
};

interface User {
	email: string;
	fullName?: string;
}
interface Speaker {
	id: string;
	name: string;
	role: string;
	organization: string;
	bio: string;
}

type Status = 'waiting' | 'in_progress' | 'failed' | 'success';

export type { Event, User, Status, Role, Speaker };
