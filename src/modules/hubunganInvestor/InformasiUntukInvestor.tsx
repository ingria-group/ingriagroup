import { Download } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { InformasiUntukInvestorType } from '@/interface/HubunganInvestorType'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

interface InformasiUntukInvestorProps {
  informasiUntukInvestor: InformasiUntukInvestorType[]
}

const InformasiUntukInvestor: React.FC<InformasiUntukInvestorProps> = ({ informasiUntukInvestor }) => {
  const language = useLanguage()
  const dataInvestor = informasiUntukInvestor
  const [selectedYear, setSelectedYear] = useState<string>('All')
  const [selectFile, setSelectFile] = useState<string>(dataInvestor[0].data[0].file)
  const [active, setActive] = useState<number>(dataInvestor[0].data[0].id)

  const handleClickFile = (dataFile: string, id: number) => {
    setActive(id)
    setSelectFile(dataFile)
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const year = event.target.value
    setSelectedYear(year)

    if (year === 'All') {
      const allData = dataInvestor.flatMap((item) => item.data)
      setSelectFile(allData[0].file)
      setActive(allData[0].id)
    } else {
      const filteredData = dataInvestor.find((item) => item.tahun === year)?.data
      if (filteredData && filteredData.length > 0) {
        setSelectFile(filteredData[0].file)
        setActive(filteredData[0].id)
      }
    }
  }

  const filtereddataInvestor =
    selectedYear === 'All' ? dataInvestor : dataInvestor.filter((item) => item.tahun === selectedYear)

  return (
    <Blank title='Informasi Untuk Investor'>
      <div className='container mx-auto'>
        <div className='text-h5-desktop'>Rapat Umum Pemegang Saham</div>
        <div className='grid grid-cols-1 gap-8 sm:mt-7 sm:grid-cols-2'>
          <div className='flex flex-col'>
            <select
              className='mb-4 rounded border border-gray-300 p-2'
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value='All'>Show All</option>
              {dataInvestor.map((item) => (
                <option
                  key={item.id}
                  value={item.tahun}
                >
                  {item.tahun}
                </option>
              ))}
            </select>
            {filtereddataInvestor.map((yearData) => (
              <div
                key={yearData.tahun}
                className='my-4'
              >
                <div className='grid grid-flow-col items-center'>
                  <h3 className='text-xl font-bold'>{yearData.tahun}</h3>
                  <Separator className='col-span-9 h-1' />
                </div>
                {yearData.data.map((report) => (
                  <div
                    className='cursor-pointer border-b-2'
                    key={report.id}
                    onClick={() => handleClickFile(report.file, report.id)}
                  >
                    <div
                      className={`flex flex-row items-center justify-between py-4 ${
                        report.id === active ? 'text-primary-600' : ''
                      }`}
                    >
                      <div className='text-body-mobile sm:text-body-desktop'>
                        {report.translations.find((d) => d.languages_code === language)?.title}
                      </div>
                      <a
                        href={report.file}
                        download='sample.pdf'
                      >
                        <Button
                          variant='tertiary'
                          size='iconSm'
                          icon={<Download color='grey' />}
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className='box-content rounded-2xl pb-6 pt-7 shadow-lg sm:px-6'>
            <embed
              src={String(getAssets(selectFile))}
              type='application/pdf'
              width='100%'
              height='600px'
            />
          </div>
        </div>
      </div>
    </Blank>
  )
}

export default InformasiUntukInvestor
