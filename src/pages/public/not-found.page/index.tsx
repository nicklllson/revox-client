import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/button'
import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-2 p-5 min-h-dvh items-center justify-center">
      <h1>404 Page Not Found</h1>
      <p className='mb-6'>Maybe you looking for translation, so check it out!</p>
      <Button asChild className='w-fit' size='lg' variant='secondary' accent='secondary'>
        <Link to={ROUTES.PUBLIC.HOME}>Home</Link>
      </Button>
  </div>
  )
}

export const Component = NotFoundPage;