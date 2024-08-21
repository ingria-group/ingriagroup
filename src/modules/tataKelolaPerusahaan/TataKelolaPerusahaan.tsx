import React, { useEffect, useState } from 'react'
import TabsC from '@/components/TabsC'
import { TataKelolaContent, TataKelolaType } from '@/interface/TataKelolaPeusahaanType'
import Blank from '@/layouts/Blank'
import useLanguage from '@/utils/useLanguage'
import { Tabs, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent, TabsList } from '@radix-ui/react-tabs'

interface TataKelolaProps {
  tataKelola: TataKelolaType
}

const TataKelolaPerusahaan: React.FC<TataKelolaProps> = ({ tataKelola }) => {
  const language = useLanguage()
  const dataTranslations = tataKelola.translations.find((i) => i.languages_code === language)

  const [activeTab, setActiveTab] = useState<string | undefined>(dataTranslations?.tabs[0]?.title)
  const [tempData, setTempData] = useState<TataKelolaContent | null>(null)
  const [activeSub, setActiveSub] = useState<TataKelolaContent | null>(null)

  useEffect(() => {
    if (dataTranslations) {
      const selectedTab = dataTranslations.tabs.find((tab) => tab.title === activeTab)
      const initialContent = dataTranslations.tabs[0]?.content[0] || null
      setTempData(initialContent)
      setActiveSub(initialContent)
      if (selectedTab) {
        setTempData(selectedTab.content[0] || null)
        setActiveSub(selectedTab.content[0] || null)
      }
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
        <Tabs
          defaultValue={dataTranslations?.tabs[0]?.title || ''}
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
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {dataTranslations?.tabs.map((datas) => (
            <TabsContent
              key={datas.id}
              className='w-full bg-primary-900'
              value={datas.title}
            >
              <div className='grid grid-cols-1 p-4 md:grid-cols-4 md:p-9 md:py-8'>
                <div className='grid grid-flow-row gap-6'>
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
                        {v.title}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='col-span-3 text-white'>
                  {tempData && (
                    <>
                      <div className='mb-5 text-h6-desktop'>{tempData.title}</div>
                      <div className='text-body-desktop-regular font-normal'>{tempData.description}</div>
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
