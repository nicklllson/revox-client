import { z } from 'zod';

export const createPlaylistSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(50, { message: 'Name must be 50 characters or less' }),
});

export type TCreatePlaylistForm = z.infer<typeof createPlaylistSchema>;
