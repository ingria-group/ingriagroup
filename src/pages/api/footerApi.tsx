import type { NextApiRequest, NextApiResponse } from 'next'

import { baseUrl } from '@/utils/baseUrl'

type Data = {
  message: string
  data: any
}

export default async function handlerFooter(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const response = await fetch(baseUrl + 'footer?fields[]=*,tab.*&fields[]=*,tabRight.*&fields[]=*,copyRight.*')

    if (!response.ok) {
      throw new Error('Erorr Fetch')
    }

    const result = await response.json()
    res.status(200).json({ message: 'successfully', data: result })
  } catch (error) {
    res.status(500).json({ message: 'Erorr Fetch', data: error })
  }
}
