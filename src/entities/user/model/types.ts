export type TUser = {
	id: string;
	nickname?: string | null;
	email: string;
	createdAt: string | Date | null;
	avatarUrl?: string | null;
	birthdate?: string | Date | null;
	purpose?: string | null;
};

export type TUpdateUser = Partial<Omit<TUser, 'id' | 'createdAt'>>;
