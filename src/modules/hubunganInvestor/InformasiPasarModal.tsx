import React from 'react'

import TableComponent from '@/components/TableComponent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InformasiPasarModalType } from '@/interface/HubunganInvestorType'
import Blank from '@/layouts/Blank'
import useLanguage from '@/utils/useLanguage'

interface InformasiPasarModalProps {
  informasiPasarModal: InformasiPasarModalType[]
}

const DataTable: React.FC<{
  caption: string
  data: { id: number; kategori: string; value: string; saham: string; kepemilikan: string }[]
}> = ({ caption, data }) => {
  if (!data || data.length === 0) return null
  const headers: string[] = Object.keys(data[0])
  const rows: string[][] = data.map((row) => headers.map((header) => String(row[header as keyof typeof row])))

  return (
    <div>
      <TableComponent
        caption={caption}
        headers={headers}
        rows={rows}
      />
    </div>
  )
}

const InformasiPasarModal: React.FC<InformasiPasarModalProps> = ({ informasiPasarModal }) => {
  const language = useLanguage()

  const mergedData = informasiPasarModal.map((item1) => {
    const translation = item1.translations.find((item2) => item2.languages_code === language)
    return {
      id: item1.id,
      kategori: translation ? translation.kategori : '',
      value: item1.value,
      saham: item1.saham,
      kepemilikan: item1.kepemilikan,
    }
  })

  return (
    <Blank title='Informasi Pasar Modal'>
      <div className='container mx-auto'>
        <h5 className='mb-4 text-h4-mobile font-semibold sm:mb-7 sm:text-h4-desktop'>Informasi Pasar Modal</h5>
        <Tabs
          defaultValue='saham'
          className='w-full'
        >
          <TabsList>
            <TabsTrigger value='saham'>Saham</TabsTrigger>
            <TabsTrigger value='obligasi'>Obligasi</TabsTrigger>
            <TabsTrigger value='dividen'>Dividen</TabsTrigger>
          </TabsList>
          <TabsContent value='saham'>
            <DataTable
              caption='Saham'
              data={mergedData}
            />
          </TabsContent>
          <TabsContent value='obligasi'>
            <DataTable
              caption='Obligasi'
              data={mergedData}
            />
          </TabsContent>
          <TabsContent value='dividen'>
            <DataTable
              caption='Dividen'
              data={mergedData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Blank>
  )
}

export default InformasiPasarModal
