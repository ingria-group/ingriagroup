import React from 'react'

import CardForm from '@/components/CardForm'
import Blank from '@/layouts/Blank'

const Kontak = () => {
  return (
    <Blank title='Kontak'>
      <div className='container mx-auto my-5 flex flex-col gap-3 sm:flex-row sm:gap-0'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.363364058239!2d106.74814487604577!3d-6.346972162098325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef33a3531733%3A0x330935103733a6e9!2sINGRIA%20GROUP!5e0!3m2!1sen!2sid!4v1718171728130!5m2!1sen!2sid'
          width='600'
          height='450'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          className='w-full'
        />
        <div className='w-full'>
          <CardForm title='Hubungi Kami' />
        </div>
      </div>
    </Blank>
  )
}

export default Kontak
