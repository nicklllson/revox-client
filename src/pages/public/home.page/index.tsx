import { Prompt } from '@/widgets/prompt';

const MainPage = () => {
	return (
    <div className='flex flex-col gap-10 flex-1 p-5 justify-center'>
      <div className="flex flex-col items-center justify-center gap-10 w-full select-none" id='onboarding-welcome'>
        <div className="flex flex-col items-center gap-6 relative z-10 max-2xl:gap-3">
          <h1 className='max-2xl:text-4xl!'>What are we translating?</h1>
          <p className='text-muted-foreground max-2xl:text-sm'>Paste a YouTube link · we’ll dub it in chosen language with a natural voice.</p>
        </div>
        <Prompt />
    </div>
  </div>
  )
};

export const Component = MainPage;
