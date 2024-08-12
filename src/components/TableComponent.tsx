import React from 'react'

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'

interface TableComponentProps {
  caption: string
  headers: string[]
  rows: string[][]
  footerContent?: string[]
}

const TableComponent: React.FC<TableComponentProps> = ({ caption, headers, rows, footerContent }) => {
  return (
    <Table className='border-2'>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {footerContent && (
        <TableFooter>
          <TableRow>
            {footerContent.map((content, index) => (
              <TableCell key={index}>{content}</TableCell>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  )
}

export default TableComponent
