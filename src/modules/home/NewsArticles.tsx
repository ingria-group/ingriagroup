import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import useLanguage from '@/utils/useLanguage'

export interface NewsArticlesTranslations {
  id: number
  new_articles_id: number
  languages_code: string
  button_title: string
  title: string
  data_berita: {
    id: number
    title: string
    path: string
    content: { id: number; title: string; htmlContent: string }[]
  }[]
  item_new_articles: { id: string; title: string; description: string; path: string }[]
}

export interface NewsArticlesType {
  id: number
  path: string
  translations: NewsArticlesTranslations[]
}

interface NewsArticlesProps {
  dataNewArticles: NewsArticlesType[]
}

const NewsArticles: React.FC<NewsArticlesProps> = ({ dataNewArticles }) => {
  const language = useLanguage()
  const dataTranslation = dataNewArticles[0].translations.find((i) => i.languages_code === language)
  return (
    <div className='bg-primary-100 py-9'>
      <div className='container mx-auto grid grid-cols-1 gap-7 px-4 md:grid-cols-4 md:px-0'>
        <div className='mt-4 box-content pr-0 md:pr-8'>
          <div className='mb-7 text-h3-mobile font-semibold md:text-h3-desktop'>{dataTranslation?.title}</div>
          <Button
            size='lg'
            variant='secondary'
          >
            <Link href={dataNewArticles[0].path}>
              <div className='text-button-mobile font-semibold md:text-button-desktop'>
                <div className='flex flex-row gap-3'>
                  {dataTranslation?.button_title}
                  <ExternalLink />
                </div>
              </div>
            </Link>
          </Button>
        </div>
        {/* {dataTranslation?.item_new_articles.map((i) => (
          <Link
            href={i.path}
            key={i.id}
          >
            <div className='grid cursor-pointer grid-flow-row'>
              <div className='mb-5 line-clamp-3 text-h4-mobile font-semibold md:text-h4-desktop'>{i.title}</div>
              <div className='text-body-mobile md:text-body-desktop mb-5 line-clamp-3'>{i.description}</div>
              <Button
                variant='tertiary'
                size='lg'
                className='justify-start p-0'
              >
                Learn More
              </Button>
            </div>
          </Link>
        ))} */}
        {dataTranslation?.data_berita.map((i) => (
          <Link
            href={i.path || '/'}
            key={i.id}
          >
            <div className='grid cursor-pointer grid-flow-row'>
              <div className='mb-5 line-clamp-3 text-h4-mobile font-semibold md:text-h4-desktop'>{i.title}</div>
              <div
                className='text-body-mobile md:text-body-desktop mb-5 line-clamp-3'
                dangerouslySetInnerHTML={{ __html: i.content[0].htmlContent }}
              />
              <Button
                variant='tertiary'
                size='lg'
                className='justify-start p-0'
              >
                Learn More
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NewsArticles
