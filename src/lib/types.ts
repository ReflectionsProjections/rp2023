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

export type { Event };
