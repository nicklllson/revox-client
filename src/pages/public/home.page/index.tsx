import { TranslationModelSelect } from '@/features/select-translation-model';
import { Prompt } from '@/widgets/prompt';

const MainPage = () => {
	return (
    <div className='flex flex-col gap-10 items-center flex-1 justify-center px-5 pt-22.5'>
      <div className="mb-40 flex flex-col items-center gap-10 w-full">
        <div className="flex flex-col items-center gap-6 relative z-10">
          <h1>What are we translating?</h1>
          <p className='text-muted-foreground'>Paste a YouTube link · we’ll dub it in chosen language with a natural voice.</p>
        </div>
        <Prompt />
        <TranslationModelSelect />
    </div>
  </div>
  )
};

export const Component = MainPage;
