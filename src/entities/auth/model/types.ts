type AuthBaseDto = {
	email: string;
	password: string;
};

export type RegisterDto = AuthBaseDto;

export type LoginDto = AuthBaseDto;
