export const VideoLayout = () => {
	return (
		<div className='flex w-full flex-1 flex-col gap-2'>
			<div className='flex h-[70dvh] min-h-[440px] w-full gap-5'>
				<div className='w-[70%] min-w-[] rounded-2xl bg-white/10'></div>
				<div className='w-[30%] rounded-2xl bg-white/10'></div>
			</div>
			<div className='flex items-center justify-between gap-2'>
				<div className=''>
					<span>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
						consequuntur minus vitae
					</span>
				</div>
				<div className='flex gap-2'>
					<div className=''>change language</div>
					<div className=''>add to fav</div>
					<div className=''>report</div>
				</div>
			</div>
		</div>
	);
};
