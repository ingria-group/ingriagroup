import FormData from 'form-data'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export const config = {
  api: {
    bodyParser: false,
  },
}

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm()

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: 'Error parsing the file' })
        return
      }

      const file = files.file && Array.isArray(files.file) ? files.file[0] : files.file
      const filePath = file ? file.filepath : undefined

      if (!filePath) {
        res.status(400).json({ message: 'No file uploaded' })
        return
      }

      try {
        const fileStream = fs.createReadStream(filePath)
        const formData = new FormData()
        formData.append('file', fileStream, file?.originalFilename || 'upload')

        const response = await fetch('https://ingria.fly.dev/files', {
          method: 'POST',
          body: formData,
          headers: formData.getHeaders(),
        })

        if (!response.ok) {
          throw new Error('Error uploading file to external API')
        }

        const result = await response.json()
        res.status(200).json({ message: 'File uploaded successfully', data: result })
      } catch (error) {
        res.status(500).json({ message: 'Error uploading file to external API', error })
      }
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default upload
