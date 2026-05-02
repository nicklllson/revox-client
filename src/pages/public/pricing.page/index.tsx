import { Button } from '@/shared/ui/button';
import { PricingCards } from '@/widgets/pricing';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';

const PricingPage = () => {
  const navigate = useNavigate()
  const handleBack = () => navigate(-1)

  return (
    <div className="pt-14 relative z-10">
      <div className="flex flex-col items-center mb-24">
        <h1 className='mb-6'>Pricing</h1>
        <p className='text-muted-foreground'>See our plans for individuals, businesses, and enterprises.</p>
      </div>

      <Button 
        onClick={handleBack}
        size='icon'
        variant='default'
        className='absolute top-5 right-5'>
        <X />
      </Button>
      
      <PricingCards />
  </div>
  )
}

export const Component = PricingPage;