import { Mail, MapPin, MessageSquare, Phone, Printer } from 'lucide-react'
import React from 'react'

const data = {
  title: 'PT Ingria Pratama Capitalindo Tbk',
  address: 'Ruko Pondok Cabe Mutiara Blok C No. 27',
  tab: [
    {
      id: 1,
      title: 'Home',
      path: '/home',
    },
    {
      id: 2,
      title: 'About Us',
      path: '/about-us',
    },
    {
      id: 3,
      title: 'Business Field',
      path: '/',
    },
    {
      id: 4,
      title: 'Investor Relation',
      path: '/',
    },
    {
      id: 5,
      title: 'Community Service',
      path: '/',
    },
  ],
  tabRight: [
    {
      id: 6,
      title: 'Media',
      path: '/',
    },
    {
      id: 7,
      title: 'Career',
      path: '/',
    },
    {
      id: 8,
      title: 'Contact',
      path: '/',
    },
  ],
  copyRight: [
    {
      id: 1,
      description: 'Copyright © 2024 Ingria Pratama',
    },
    {
      id: 2,
      description: 'Capitalindo | Ingria Pratama',
    },
    {
      id: 3,
      description: 'Capitalindo tbk',
    },
  ],
}

const Footer = () => {
  return (
    <div className='bg-primary-900 py-4 text-white sm:py-8'>
      <div className='container mx-auto px-4 sm:px-0'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-9 sm:text-start'>
          <div className='flex flex-col gap-6'>
            <div className='text-h3-desktop font-semibold'>{data.title}</div>
            <div className='text-body-desktop-large sm:text-start'>{data.address}</div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col gap-4'>
              {data.tab.map((i) => (
                <div
                  key={i.id}
                  className='py-4 pr-5'
                >
                  {i.title}
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-4'>
              {data.tabRight.map((i) => (
                <div
                  key={i.id}
                  className='py-4 pr-5'
                >
                  {i.title}
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-7'>
            <div>
              {data.copyRight.map((i) => (
                <div
                  className='text-body-desktop-large'
                  key={i.id}
                >
                  {i.description}
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-6'>
              <div className='text-h6-desktop font-bold'>Find us on</div>
              <div className='flex gap-4'>
                <MapPin />
                <Phone />
                <MessageSquare />
                <Mail />
                <Printer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
