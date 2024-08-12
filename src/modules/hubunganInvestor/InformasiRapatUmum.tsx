import { Download } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  BahanMataAcaraType,
  ContentType,
  PengumumanDanPemanggilanType,
  RingkasanRisalahType,
} from '@/interface/HubunganInvestorType'
import Blank from '@/layouts/Blank'
import getAssets from '@/utils/getAssets'
import useLanguage from '@/utils/useLanguage'

interface InformasiRapatUmumProps {
  pengumumanPemanggilan: PengumumanDanPemanggilanType
  bahanMataAcara: BahanMataAcaraType[]
  ringkasanRisalah: RingkasanRisalahType[]
}

interface PengumumanDanPemanggilanProps {
  data: PengumumanDanPemanggilanType
}

interface BahanMataAcaraProps {
  data: BahanMataAcaraType[]
}

interface RingkasanRisalahProps {
  data: RingkasanRisalahType[]
}

const PengumumanDanPemanggilan: React.FC<PengumumanDanPemanggilanProps> = ({ data }) => {
  const language = useLanguage()
  const [selectFile, setSelectFile] = useState<ContentType>(data.content[0])
  const handleClickFile = (file: ContentType) => {
    setSelectFile(file)
  }
  return (
    <div className='box-content rounded-2xl pb-4 shadow-lg sm:px-6'>
      <div>{selectFile.translations.find((i) => i.languages_code === language)?.title}</div>
      <embed
        src={String(getAssets(selectFile.src))}
        type='application/pdf'
        width='100%'
        height='600px'
      />

      <div className='mt-8 flex flex-col gap-6'>
        <div className=' text-h5-mobile font-semibold sm:text-h5-desktop'>Berkas Terkait</div>
        {data.content.map((i) => (
          <div
            className='cursor-pointer border-b-2'
            key={i.id}
            onClick={() => handleClickFile(i)}
          >
            <div
              className={`flex flex-row items-center justify-between py-4 ${
                i.id === (selectFile && selectFile.id) ? 'text-primary-600' : ''
              }`}
            >
              <div className='text-body-mobile-regular font-medium sm:text-body-desktop-large'>
                {i.translations.find((d) => d.languages_code === language)?.title}
              </div>
              <a
                href={String(getAssets(i.src))}
                download={String(getAssets(i.src))}
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
    </div>
  )
}

const BahanMataAcara: React.FC<BahanMataAcaraProps> = ({ data }) => {
  const dataBahanMata: BahanMataAcaraType[] = data
  const language = useLanguage()
  const [selectedYear, setSelectedYear] = useState<string>('All')
  const [selectFile, setSelectFile] = useState<string>(dataBahanMata[0].data[0].file)
  const [active, setActive] = useState<number>(dataBahanMata[0].data[0].id)

  const handleClickFile = (dataFile: string, id: number) => {
    setActive(id)
    setSelectFile(dataFile)
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const year = event.target.value
    setSelectedYear(year)

    if (year === 'All') {
      const allData = dataBahanMata.flatMap((item) => item.data)
      setSelectFile(allData[0].file)
      setActive(allData[0].id)
    } else {
      const filteredData = dataBahanMata.find((item) => item.tahun === year)?.data
      if (filteredData && filteredData.length > 0) {
        setSelectFile(filteredData[0].file)
        setActive(filteredData[0].id)
      }
    }
  }

  const filteredDataBahanMata =
    selectedYear === 'All' ? dataBahanMata : dataBahanMata.filter((item) => item.tahun === selectedYear)

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
            {dataBahanMata.map((item) => (
              <option
                key={item.id}
                value={item.tahun}
              >
                {item.tahun}
              </option>
            ))}
          </select>
          {filteredDataBahanMata.map((yearData) => (
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
                      {report.translations?.find((d) => d.languages_code === language)?.title || 'No Title Available'}
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

const RingkasanRisalah: React.FC<RingkasanRisalahProps> = ({ data }) => {
  const language = useLanguage()
  const dataRingkasan: RingkasanRisalahType[] = data
  const [selectedYear, setSelectedYear] = useState<string>('All')
  const [selectFile, setSelectFile] = useState<string>(dataRingkasan[0].data[0].file)
  const [active, setActive] = useState<number>(dataRingkasan[0].data[0].id)

  const handleClickFile = (dataFile: string, id: number) => {
    setActive(id)
    setSelectFile(dataFile)
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const year = event.target.value
    setSelectedYear(year)

    if (year === 'All') {
      const allData = dataRingkasan.flatMap((item) => item.data)
      setSelectFile(allData[0].file)
      setActive(allData[0].id)
    } else {
      const filteredData = dataRingkasan.find((item) => item.tahun === year)?.data
      if (filteredData && filteredData.length > 0) {
        setSelectFile(filteredData[0].file)
        setActive(filteredData[0].id)
      }
    }
  }

  const filteredDataRingkasan =
    selectedYear === 'All' ? dataRingkasan : dataRingkasan.filter((item) => item.tahun === selectedYear)

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
            {dataRingkasan.map((item) => (
              <option
                key={item.id}
                value={item.tahun}
              >
                {item.tahun}
              </option>
            ))}
          </select>
          {filteredDataRingkasan.map((yearData) => (
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

const InformasiRapatUmum: React.FC<InformasiRapatUmumProps> = ({
  bahanMataAcara,
  pengumumanPemanggilan,
  ringkasanRisalah,
}) => {
  const dataItems = [
    { id: 1, data: <PengumumanDanPemanggilan data={pengumumanPemanggilan} />, title: 'Pengumuman dan pemanggilan' },
    { id: 2, data: <BahanMataAcara data={bahanMataAcara} />, title: 'Bahan Mata Acara ' },
    { id: 3, data: <RingkasanRisalah data={ringkasanRisalah} />, title: 'Ringkasan Risalah' },
  ]
  const [active, setActive] = useState(dataItems[0])
  function handleClickDatas(v: { id: number; title: string; data: React.ReactElement }): void {
    setActive(v)
  }

  return (
    <Blank title='Rapat Umum Pemegang Saham'>
      <div className='container mx-auto'>
        <div className='text-h5-desktop'>Rapat Umum Pemegang Saham</div>
        <div className='grid grid-cols-1 p-4 sm:gap-7 md:grid-cols-4 md:py-8'>
          <div className='flex flex-col gap-6'>
            {dataItems.map((v) => (
              <div
                className='cursor-pointer'
                key={v.id}
                onClick={() => handleClickDatas(v)}
              >
                <div
                  className={
                    active?.id === v.id ? 'text-h6-desktop font-medium text-primary-500' : 'text-h6-desktop font-medium'
                  }
                >
                  {v.title}
                </div>
              </div>
            ))}
          </div>
          <div className='col-span-3 shadow-lg '>{active.data}</div>
        </div>
      </div>
    </Blank>
  )
}

export default InformasiRapatUmum
