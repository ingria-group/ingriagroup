import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import useLanguage from '@/utils/useLanguage'
import useLocalStorage from '@/utils/useLocalStorage'

interface DataNavbar {
  id: number
  logo: string
  menu: MenuItem[]
}

interface List_menu {
  id: number
  list_id: number
  path: string
  translations: { id: number; languages_code: string; menu_navbar_id: number; title: string }[]
}

interface MenuItem {
  id: number
  navbar_id: number
  path: string
  translations: { id: number; menu_navbar_id: number; languages_code: string; title: string }[]
  list: List_menu[]
}

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dataNavbar, setDataNavbar] = useState<DataNavbar>()
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [language, setLanguage] = useLocalStorage('language', null)
  const router = useRouter()
  const languageNav = useLanguage()

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const response = await fetch('/api/navbarApi')
        if (!response.ok) {
          throw new Error('Failed to fetch navbar data')
        }
        const { data: fetchedData } = await response.json()
        setDataNavbar(fetchedData.data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }

    fetchNavbarData()
  }, [])

  if (language === null) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', 'id-ID')
    }
  }
  const handleTranslationsInonesia = () => {
    setLanguage('id-ID')
    router.reload()
  }

  const handleTranslationsEngland = () => {
    setLanguage('en-US')
    router.reload()
  }

  const handleMenuClick = (menuTitle: string) => {
    setActiveMenu(activeMenu === menuTitle ? null : menuTitle)
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    setActiveMenu(null) // reset active menu when mobile menu toggled
  }

  const handleMouseLeave = () => {
    setActiveMenu(null)
  }

  const isActiveLink = (path: string, title: string) => {
    const currentPath = router.pathname.toLowerCase()
    const asPathCurrent = router.asPath.toLowerCase()
    const titleSlug = title.toLowerCase().replace(/\s+/g, '-')
    return currentPath.startsWith(path) || currentPath.includes(titleSlug) || asPathCurrent.includes(path)
  }

  return (
    <nav className='p-4 lg:px-9 lg:py-6'>
      <div className='relative flex items-center justify-between'>
        <div className='block lg:hidden'>
          <button onClick={handleMobileMenuToggle}>
            <svg
              className='size-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
        <div className='flex cursor-pointer items-center'>
          <Link href='/'>
            <div className='relative size-5'>
              <Image
                src={'https://ingria.fly.dev/assets/' + dataNavbar?.logo}
                alt='logo'
                layout='fill'
              />
            </div>
          </Link>
        </div>
        <div className='grid grid-cols-12 gap-4'>
          <button
            onClick={() => handleTranslationsInonesia()}
            className='col-span-6 flex'
          >
            <img
              src='/assets/image/IDN.svg'
              alt='IDN'
              width={20}
            />{' '}
            <span className='ml-3 text-subtle-desktop font-bold capitalize'>IDN</span>
          </button>
          <button
            onClick={() => handleTranslationsEngland()}
            className='col-span-6 flex'
          >
            <img
              src='/assets/image/US.svg'
              alt='US'
              width={20}
            />{' '}
            <span className='ml-3 text-subtle-desktop font-bold capitalize'>ENG</span>
          </button>
        </div>
        <div className='hidden items-center gap-3 lg:flex'>
          {dataNavbar?.menu
            .filter((f) => f.path === null)
            .map((d) => {
              const dataTranslations = d.translations.find((i) => i.languages_code === languageNav)
              return (
                <div
                  className={`text-button-small-mobile font-semibold lg:px-3 lg:text-button-desktop ${
                    isActiveLink(d.list[0].path, dataTranslations?.title || '')
                      ? 'border-b-2 border-primary-600 pb-2'
                      : ''
                  }`}
                  key={d.id}
                >
                  <button
                    className='line-clamp-1'
                    onClick={() => handleMenuClick(dataTranslations?.title || '')}
                  >
                    {dataTranslations?.title || ''}
                  </button>
                </div>
              )
            })}

          {dataNavbar?.menu
            .filter((f) => f.path !== null)
            .map((d) => {
              const dataTranslations = d.translations.find((i) => i.languages_code === languageNav)
              return (
                <div
                  className={`text-button-small-mobile font-semibold lg:px-3 lg:text-button-desktop ${
                    isActiveLink(d.path, dataTranslations?.title || '') ? 'border-b-2 border-primary-600' : ''
                  }`}
                  key={d.id}
                >
                  <Link href={d.path}>{dataTranslations?.title}</Link>
                </div>
              )
            })}
        </div>
      </div>
      {/* dropdown for mobile menu */}
      {mobileMenuOpen && (
        <div className=' absolute left-0 top-7 z-20 bg-white p-3 lg:hidden'>
          <div className='flex flex-col'>
            {dataNavbar?.menu
              .filter((f) => f.path === null)
              .map((d) => {
                const dataTranslations = d.translations.find((i) => i.languages_code === languageNav)
                return (
                  <div key={d.id}>
                    <button
                      className={`py-2 text-button-small-mobile font-semibold ${
                        isActiveLink(d.list[0].path, dataTranslations?.title || '') ? 'text-primary-600' : ''
                      }`}
                      onClick={() => handleMenuClick(dataTranslations?.title || '')}
                    >
                      {dataTranslations?.title}
                    </button>
                    {activeMenu === dataTranslations?.title && (
                      <div className='pl-4'>
                        {d.list.map((item) => {
                          const dataTranslations = item.translations.find((i) => i.languages_code === languageNav)
                          return (
                            <div
                              className={`py-1 text-body-mobile-regular text-black ${
                                isActiveLink(item.path, dataTranslations?.title || '')
                                  ? 'border-b-2 border-primary-600'
                                  : ''
                              }`}
                              key={item.id}
                            >
                              <Link href={item.path}>{dataTranslations?.title}</Link>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            {dataNavbar?.menu
              .filter((f) => f.path !== null)
              .map((d) => {
                const dataTranslations = d.translations.find((i) => i.languages_code === languageNav)
                return (
                  <div
                    className={`py-2 text-button-small-mobile font-semibold ${
                      isActiveLink(d.path, dataTranslations?.title || '') ? 'text-primary-600' : ''
                    }`}
                    key={d.id}
                  >
                    <Link href={d.path}>{dataTranslations?.title}</Link>
                  </div>
                )
              })}
          </div>
        </div>
      )}
      {/* dropdown for desktop */}
      {activeMenu && !mobileMenuOpen && (
        <div
          className='absolute inset-x-0 top-8 z-10 mx-auto w-full rounded-sm bg-white lg:px-10 lg:py-7'
          onMouseLeave={handleMouseLeave}
        >
          <div className='hidden grid-cols-3 gap-8 lg:grid'>
            <h2 className='mx-auto text-h2-desktop font-bold text-black'>{activeMenu}</h2>
            <div className='col-span-2 grid grid-flow-row grid-cols-3 gap-4'>
              {dataNavbar?.menu
                .find((menu) => menu.translations.find((i) => i.languages_code === languageNav)?.title === activeMenu)
                ?.list.map((item) => {
                  const dataTranslations = item.translations.find((i) => i.languages_code === languageNav)
                  return (
                    <div
                      className={`text-body-mobile-regular text-black lg:pb-6 lg:text-body-desktop-regular ${
                        isActiveLink(item.path, dataTranslations?.title || '') ? 'text-primary-600' : ''
                      }`}
                      key={item.id}
                    >
                      <Link href={item.path}>{dataTranslations?.title}</Link>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
