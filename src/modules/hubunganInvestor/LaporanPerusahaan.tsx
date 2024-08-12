import { Download } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IkhtisarKeuanganType, LaporanKeuanganDataType, LaporanType } from '@/interface/HubunganInvestorType'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

interface LaporanPerusahaanProps {
  ikhtisarKeuangan: IkhtisarKeuanganType
  laporanTahunan: LaporanType[]
  prospektusData: LaporanType[]
  laporanKeuangan: LaporanKeuanganDataType[]
}

interface IkhtisarKeuanganProps {
  data: IkhtisarKeuanganType
}

interface LaporanKeuanganProps {
  data: LaporanKeuanganDataType[]
}

interface LaporanTahunanProps {
  data: LaporanType[]
}

interface ProspektusDataProps {
  data: LaporanType[]
}

const IkhtisarKeuangan: React.FC<IkhtisarKeuanganProps> = ({ data }) => {
  const language = useLanguage()
  const dataIkhtisar: IkhtisarKeuanganType = data
  const [activeTab, setActiveTab] = useState<string | undefined>(
    dataIkhtisar?.data[0]?.translations?.find((i) => i.languages_code === language)?.title
  )
  const [dataFirst, setDataFirst] = useState(dataIkhtisar.data[0].dataTable)

  useEffect(() => {
    const selectedTab = dataIkhtisar.data.find(
      (tab) => tab.translations.find((d) => d.languages_code === language)?.title === activeTab
    )
    if (selectedTab) {
      setDataFirst(selectedTab.dataTable)
    }
  }, [activeTab, dataIkhtisar.data])
  return (
    <div className=''>
      <Separator className='my-7 w-full' />
      <div className='flex flex-row justify-between'>
        <div>
          <div className='text-h5-desktop font-semibold'>
            {dataIkhtisar.translations.find((d) => d.languages_code === language)?.title}
          </div>
          <div className='text-body-desktop-large'>
            {dataIkhtisar.translations.find((d) => d.languages_code === language)?.description}
          </div>
        </div>
        <Button
          variant='primary'
          size='sm'
          icon={<Download />}
        >
          Export As CSV
        </Button>
      </div>
      <Tabs
        className='my-6 w-full'
        onValueChange={() => setActiveTab}
      >
        <TabsList>
          {dataIkhtisar.data.map((tab) => {
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.value}
                className='capitalize sm:text-body-desktop-large'
              >
                {tab.translations.find((d) => d.languages_code === language)?.title}
              </TabsTrigger>
            )
          })}
        </TabsList>
        {dataIkhtisar.data.map((tab) => {
          const years = dataFirst[0]?.content.map((item) => item.tahun) || []
          return (
            <TabsContent
              key={tab.id}
              value={tab.value}
              className='mt-5'
            >
              <Table className='rounded-xl border'>
                <TableCaption>{tab.value}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tahun</TableHead>
                    {years.map((year, index) => (
                      <TableHead key={index}>{year}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataFirst.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className='font-medium'>
                        {item.translations.find((d) => d.languages_code === language)?.subTitle}
                      </TableCell>
                      {item.content.map((contentItem) => (
                        <TableCell key={contentItem.id}>{contentItem.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          )
        })}
      </Tabs>
      {/* <TabsC
        className='my-6'
        classNameTrigger='sm:text-body-desktop-large'
        classNameContent='mt-5'
        onChange={setActiveTab}
        defaultValue={dataIkhtisar.data[0].translations.find((d) => d.languages_code === language)?.title}
        tabsTrigger={dataIkhtisar?.data}
        tabsContent={dataIkhtisar.data.map((data) => {
          return (
            <>
              <TableC
                caption={data.value}
                data={dataFirst}
              />
            </>
          )
        })}
      /> */}
    </div>
  )
}

const LaporanTahunan: React.FC<LaporanTahunanProps> = ({ data }) => {
  const language = useLanguage()
  const dataTahunan: LaporanType[] = data
  const [selectFile, setSelectFile] = useState(dataTahunan[0].file)
  const [active, setActive] = useState(dataTahunan[0].id)

  const handleClickFile = (dataFile: string, id: number) => {
    setActive(id)
    setSelectFile(dataFile)
  }
  return (
    <>
      <div className='grid grid-cols-1 gap-8 sm:mt-7 sm:grid-cols-2'>
        <div className='flex flex-col'>
          {dataTahunan.map((i) => (
            <div
              className='cursor-pointer border-b-2'
              key={i.id}
              onClick={() => handleClickFile(i.file, i.id)}
            >
              <div
                className={`flex flex-row items-center justify-between py-4 ${
                  i.id === active ? 'text-primary-600' : ''
                }`}
              >
                <div className='text-body-mobile sm:text-body-desktop'>
                  {i.translations.find((d) => d.languages_code === language)?.title}
                </div>
                <a
                  href={i.file}
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
        <div className='box-content rounded-2xl pb-6 pt-7 shadow-lg sm:px-6'>
          <embed
            src={String(getAssets(selectFile))}
            type='application/pdf'
            width='100%'
            height='600px'
          />
        </div>
      </div>
    </>
  )
}

const LaporanKeuangan: React.FC<LaporanKeuanganProps> = ({ data }) => {
  const language = useLanguage()
  const dataKeuangan: LaporanKeuanganDataType[] = data
  const [selectedYear, setSelectedYear] = useState<string>('All')
  const [selectFile, setSelectFile] = useState<string>(dataKeuangan[0].data[0].file)
  const [active, setActive] = useState<number>(dataKeuangan[0].data[0].id)

  const handleClickFile = (dataFile: string, id: number) => {
    setActive(id)
    setSelectFile(dataFile)
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const year = event.target.value
    setSelectedYear(year)

    if (year === 'All') {
      const allData = dataKeuangan.flatMap((item) => item.data)
      setSelectFile(allData[0].file)
      setActive(allData[0].id)
    } else {
      const filteredData = dataKeuangan.find((item) => item.tahun === year)?.data
      if (filteredData && filteredData.length > 0) {
        setSelectFile(filteredData[0].file)
        setActive(filteredData[0].id)
      }
    }
  }

  const filteredDataKeuangan =
    selectedYear === 'All' ? dataKeuangan : dataKeuangan.filter((item) => item.tahun === selectedYear)

  return (
    <>
      <div className='grid grid-cols-1 gap-8 sm:mt-7 sm:grid-cols-2'>
        <div className='flex flex-col'>
          <select
            className='mb-4 rounded border border-gray-300 p-2'
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value='All'>Show All</option>
            {dataKeuangan.map((item) => (
              <option
                key={item.id}
                value={item.tahun}
              >
                {item.tahun}
              </option>
            ))}
          </select>
          {filteredDataKeuangan.map((yearData) => (
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
    </>
  )
}

const Prospektus: React.FC<ProspektusDataProps> = ({ data }) => {
  const language = useLanguage()
  const dataProspektus: LaporanType[] = data
  const [selectFile, setSelectFile] = useState(dataProspektus[0].file)
  const [active, setActive] = useState(dataProspektus[0].id)

  const handleClickFile = (dataFile: string, id: number) => {
    setActive(id)
    setSelectFile(dataFile)
  }
  return (
    <>
      <div className='grid grid-cols-1 gap-8 sm:mt-7 sm:grid-cols-2'>
        <div className='flex flex-col'>
          {dataProspektus.map((i) => (
            <div
              className='cursor-pointer border-b-2'
              key={i.id}
              onClick={() => handleClickFile(i.file, i.id)}
            >
              <div
                className={`flex flex-row items-center justify-between py-4 ${
                  i.id === active ? 'text-primary-600' : ''
                }`}
              >
                <div className='text-body-mobile sm:text-body-desktop'>
                  {i.translations.find((d) => d.languages_code === language)?.title}
                </div>
                <a
                  href={i.file}
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
        <div className='box-content rounded-2xl pb-6 pt-7 shadow-lg sm:px-6'>
          <embed
            src={String(getAssets(selectFile))}
            type='application/pdf'
            width='100%'
            height='600px'
          />
        </div>
      </div>
    </>
  )
}

const LaporanPerusahaan: React.FC<LaporanPerusahaanProps> = ({
  ikhtisarKeuangan,
  laporanTahunan,
  laporanKeuangan,
  prospektusData,
}) => {
  return (
    <Blank title='Hubungan Investor'>
      <div className='container mx-auto'>
        <h5 className='mb-4 text-h4-mobile sm:mb-7 sm:text-h4-desktop'>Laporan Perusahaan</h5>
        <Tabs
          defaultValue='ikhtisar perusahaan'
          className='w-full'
        >
          <TabsList>
            <TabsTrigger value='ikhtisar perusahaan'>Ikhtisar Keuangan</TabsTrigger>
            <TabsTrigger value='laporan tahunan'>Laporan Tahunan</TabsTrigger>
            <TabsTrigger value='laporan keuangan'>Laporan Keuangan </TabsTrigger>
            <TabsTrigger value='prospektus'>Prospektus</TabsTrigger>
          </TabsList>
          <TabsContent value='ikhtisar perusahaan'>
            <IkhtisarKeuangan data={ikhtisarKeuangan} />
          </TabsContent>
          <TabsContent value='laporan tahunan'>
            <LaporanTahunan data={laporanTahunan} />
          </TabsContent>
          <TabsContent value='laporan keuangan'>
            <LaporanKeuangan data={laporanKeuangan} />
          </TabsContent>
          <TabsContent value='prospektus'>
            <Prospektus data={prospektusData} />
          </TabsContent>
        </Tabs>
      </div>
    </Blank>
  )
}

export default LaporanPerusahaan
