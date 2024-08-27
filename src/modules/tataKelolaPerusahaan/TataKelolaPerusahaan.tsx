import React, { useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TataKelolaContent, TataKelolaType } from '@/interface/TataKelolaPeusahaanType'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

interface TataKelolaProps {
  tataKelola: TataKelolaType
}

const TataKelolaPerusahaan: React.FC<TataKelolaProps> = ({ tataKelola }) => {
  const language = useLanguage()
  const dataTranslations = tataKelola.translations.find((i) => i.languages_code === language)

  const defaultTabTitle = dataTranslations?.tabs[0]?.title || 'Default Tab'
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultTabTitle)
  const [tempData, setTempData] = useState<TataKelolaContent | null>(null)
  const [activeSub, setActiveSub] = useState<TataKelolaContent | null>(null)

  useEffect(() => {
    if (dataTranslations) {
      const selectedTab = dataTranslations.tabs.find((tab) => tab.title === activeTab) || dataTranslations.tabs[0]
      const initialContent = selectedTab?.content[0] || null
      setTempData(initialContent)
      setActiveSub(initialContent)
    }
  }, [activeTab, dataTranslations])

  const handleClickDatas = (i: TataKelolaContent) => {
    setTempData(i)
    setActiveSub(i)
  }

  if (!dataTranslations || !dataTranslations.tabs || dataTranslations.tabs.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Blank title='Tata Kelola Perusahaan'>
      <div className='container mx-auto'>
        <h4 className='mb-7 text-h4-desktop font-semibold'>{dataTranslations.title || 'Default Title'}</h4>
        <p className='mb-7'>{dataTranslations.description || ''}</p>
        <Tabs
          defaultValue={defaultTabTitle}
          className='w-full'
          onValueChange={setActiveTab}
        >
          <TabsList>
            {dataTranslations?.tabs.map((tab) => (
              <TabsTrigger
                key={tab.title}
                value={tab.title}
                className='capitalize'
              >
                {tab.title || 'Default Tab'}
              </TabsTrigger>
            ))}
          </TabsList>
          {dataTranslations?.tabs.map((datas) => (
            <TabsContent
              key={datas.id}
              className='my-6 w-full bg-primary-900'
              value={datas.title}
            >
              <div className='grid grid-cols-1 p-4 md:grid-cols-4 md:p-9 md:py-8'>
                <div className='flex flex-col gap-6'>
                  {datas?.content.map((v) => (
                    <div
                      className='cursor-pointer text-white'
                      key={v.id}
                      onClick={() => handleClickDatas(v)}
                    >
                      <div
                        className={
                          activeSub?.id === v.id
                            ? 'text-h6-desktop font-medium text-primary-500'
                            : 'text-h6-desktop font-medium text-white'
                        }
                      >
                        {v.title || 'Default Content'}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='col-span-3 mt-6 text-white sm:mt-0'>
                  {tempData && (
                    <>
                      {/* <div className='mb-5 text-h6-desktop'>{tempData.title || 'Default Title'}</div> */}
                      <div
                        className='text-body-desktop-regular font-normal'
                        dangerouslySetInnerHTML={{ __html: tempData.htmlDescription || '' }}
                      />
                      {tempData.file && (
                        <div className='box-content rounded-2xl pb-6 pt-7 shadow-lg sm:px-6'>
                          <embed
                            src={String(getAssets(tempData.file.key))}
                            type='application/pdf'
                            width='100%'
                            height='600px'
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Blank>
  )
}

export default TataKelolaPerusahaan
