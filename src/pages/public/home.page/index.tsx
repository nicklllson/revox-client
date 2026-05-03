import { TranslationModelSelect } from '@/features/select-translation-model';
import { Prompt } from '@/widgets/prompt';

const MainPage = () => {
	return (
    <div className='flex flex-col gap-10 items-center flex-1 justify-center px-5 pt-22.5'>
      <div className="mb-40 flex flex-col items-center gap-10 w-full">
        <div className="flex flex-col items-center gap-6 relative z-10">
          <h1>✨ Lets translating!</h1>
          <p className='text-muted-foreground'>What do you want to translate today?</p>
        </div>
        <Prompt />
        <TranslationModelSelect />
    </div>
  </div>
  )
};

export const Component = MainPage;
