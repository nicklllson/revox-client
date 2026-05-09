export type TPaginatedResult<T> = {
	data: T[];
	meta: {
		skip: number;
		take: number;
		total: number;
		hasMore: boolean;
		nextSkip: number | null;
	};
};
