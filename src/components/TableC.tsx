import React from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface Content {
  id: number
  tahun: string
  value: string
}

interface DataTable {
  id: number
  subTitle: string
  content: Content[]
}

interface TableCProps {
  caption: string
  data: DataTable[]
}

const TableC: React.FC<TableCProps> = ({ caption, data }) => {
  const years = data[0]?.content.map((item) => item.tahun) || []

  return (
    <Table className='rounded-xl border'>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tahun</TableHead>
          {years.map((year, index) => (
            <TableHead key={index}>{year}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium'>{item.subTitle}</TableCell>
            {item.content.map((contentItem) => (
              <TableCell key={contentItem.id}>{contentItem.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableC
