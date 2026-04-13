import { PricingCards } from '@/widgets/pricing';

const PricingPage = () => {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center mb-24">
        <h1 className='mb-6'>Pricing</h1>
        <p className='text-muted-foreground'>See our plans for individuals, businesses, and enterprises.</p>
      </div>
    <PricingCards />
  </div>
  )
}

export const Component = PricingPage;