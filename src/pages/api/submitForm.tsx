import type { NextApiRequest, NextApiResponse } from 'next'

import { baseUrl } from '@/utils/baseUrl'

type Data = {
  message: string
  data: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, phone, email, message } = req.body

    try {
      const response = await fetch(baseUrl + 'contact_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, message }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      res.status(200).json({ message: 'Form submitted successfully', data: result })
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit form', data: error })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
