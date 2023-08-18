interface Event {
	_id: string;
	name: string;
	description: string;
	start_time: string;
	end_time: string;
	duration: number;
	location: string;
	virtual: boolean;
	upgrade: boolean;
	visible: boolean;
}

type Status = 'waiting' | 'in_progress' | 'failed' | 'success';

export type { Event, Status };
