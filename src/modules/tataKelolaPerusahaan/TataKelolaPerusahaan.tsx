import React, { useEffect, useState } from 'react'

import TabsC from '@/components/TabsC'
import { TataKelolaContent, TataKelolaType } from '@/interface/TataKelolaPeusahaanType'
import Blank from '@/layouts/Blank'
import useLanguage from '@/utils/useLanguage'

interface TataKelolaProps {
  tataKelola: TataKelolaType
}

const TataKelolaPerusahaan: React.FC<TataKelolaProps> = ({ tataKelola }) => {
  const language = useLanguage()
  const dataTranslations = tataKelola.translations.find((i) => i.languages_code === language)
  const [activeTab, setActiveTab] = useState<string | undefined>(dataTranslations?.tabs[0].title)
  const [tempData, setTempData] = useState<TataKelolaContent | undefined>(dataTranslations?.tabs[0].content[0])
  const [activeSub, setActiveSub] = useState<TataKelolaContent | undefined>(tempData)

  useEffect(() => {
    const selectedTab = dataTranslations?.tabs.find((tab) => tab.title === activeTab)
    if (selectedTab) {
      setTempData(selectedTab.content[0])
    }
  }, [activeTab, dataTranslations?.tabs])

  const handleClickDatas = (i: TataKelolaContent) => {
    setTempData(i)
    setActiveSub(i)
  }

  return (
    <Blank title='Tata Kelola Perusahaan'>
      <div className='container mx-auto'>
        <TabsC
          className='w-full'
          defaultValue={dataTranslations?.tabs[0].title}
          onChange={setActiveTab}
          tabsContent={dataTranslations?.tabs?.map((datas) => {
            return (
              <div
                key={datas.id}
                className='w-full bg-primary-900'
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
                    <div className='mb-5 text-h6-desktop'>{tempData?.title}</div>
                    <div className='text-body-desktop-regular font-normal'>{tempData?.description}</div>
                  </div>
                </div>
              </div>
            )
          })}
          tabsTrigger={dataTranslations?.tabs}
        />
      </div>
    </Blank>
  )
}

export default TataKelolaPerusahaan
