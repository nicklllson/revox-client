export const getChunkIdAtTime = (
	chunkMetas: Map<number, { segments: { start: number; end: number }[] }>,
	time: number,
): number => {
	let bestId = 0;
	let found = false;

	for (const [id, meta] of chunkMetas.entries()) {
		const segs = meta.segments;
		if (segs.length === 0) continue;

		const start = segs[0].start;
		const end = segs[segs.length - 1].end;

		if (time >= start && time < end) {
			return id;
		}
		// если время уже за пределами этого чанка — он кандидат на "ближайший назад"
		if (time >= end && (!found || id > bestId)) {
			bestId = id;
			found = true;
		}
	}
	return bestId;
};
