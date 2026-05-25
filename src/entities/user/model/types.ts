export type TUser = {
	id: string;
	nickname?: string | null;
	email: string;
	createdAt: string | Date | null;
	birthdate?: string | Date | null;
	purpose?: string | null;
	avatarUrl?: string | null;
	emailConfirmed: boolean;
	profileCompleted: boolean;
};

export type TUpdateUser = Partial<Omit<TUser, 'id' | 'createdAt'>>;
