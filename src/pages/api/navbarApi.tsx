import type { NextApiRequest, NextApiResponse } from 'next'

import { baseUrl } from '@/utils/baseUrl'

type Data = {
  message: string
  data: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const response = await fetch(
      baseUrl +
        'navbar?fields[]=*,menu.translations.*&fields[]=*,menu.list.*&fields[]=*,menu.path.*&fields[]=*,menu.*&fields[]=*,menu.list.translations.*'
    )

    if (!response.ok) {
      throw new Error('Erorr Fetch')
    }

    const result = await response.json()
    res.status(200).json({ message: 'successfully', data: result })
  } catch (error) {
    res.status(500).json({ message: 'Erorr Fetch', data: error })
  }
}
