import { Mail, MapPin, MessageSquare, Phone, Printer } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface FooterData {
  id: number
  title: string
  address: string
  copyRight: { id: number; description: string }[]
  tabRight: { id: number; title: string; path: string }[]
  tab: { id: number; title: string; path: string }[]
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData>()

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/footerApi')
        if (!response.ok) {
          throw new Error('Failde to fetch footer data')
        }
        const { data } = await response.json()
        setFooterData(data.data[0])
      } catch (err) {
        console.error(err)
      }
    }

    fetchFooterData()
  }, [])

  return (
    <div className='bg-primary-900 py-4 text-white sm:py-8'>
      <div className='container mx-auto px-4 sm:px-0'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-9 sm:text-start'>
          <div className='flex flex-col gap-6'>
            <div className='text-h3-desktop font-semibold'>{footerData?.title}</div>
            <div className='text-body-desktop-large sm:text-start'>{footerData?.address}</div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col gap-4'>
              {footerData?.tab.map((i) => (
                <Link
                  key={i.id}
                  href={i.path}
                >
                  <div className='py-4 pr-5'>{i.title}</div>
                </Link>
              ))}
            </div>
            <div className='flex flex-col gap-4'>
              {footerData?.tabRight.map((i) => (
                <Link
                  key={i.id}
                  href={i.path}
                >
                  <div className='py-4 pr-5'>{i.title}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-7'>
            <div>
              {footerData?.copyRight.map((i) => (
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
