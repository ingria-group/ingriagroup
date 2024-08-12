import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useState } from 'react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

interface CardFormType {
  title: string
}

const CareerForm: React.FC<CardFormType> = ({ title }) => {
  const router = useRouter()
  const [fileData, setFileData] = useState<File | null>(null)
  const [fileName, setFileName] = useState('No file selected')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    fileId: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    file: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileData(file)
      setFileName(file.name)
      setErrors((prevErrors) => ({ ...prevErrors, file: '' }))
    } else {
      setFileName('No file selected')
      setErrors((prevErrors) => ({ ...prevErrors, file: 'Please select a file.' }))
    }
  }

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileData) {
      setErrors((prevErrors) => ({ ...prevErrors, file: 'Please select a file.' }))
      console.error('No file founded')
      return
    }
    const formData = new FormData()
    formData.append('file', fileData)

    setIsLoading(true)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error uploading file')
      }

      const result = await response.json()
      setFormData((prevFormData) => ({ ...prevFormData, fileId: result.data.data.id }))
    } catch (err) {
      console.error('Error uploading file', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prevFromData) => ({ ...prevFromData, [id]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }))
  }

  const validateForm = () => {
    let valid = true
    const newErrors = {
      name: '',
      phone: '',
      email: '',
      message: '',
      file: '',
    }

    if (!formData.name) {
      newErrors.name = 'Name is required.'
      valid = false
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.'
      valid = false
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.'
      valid = false
    }
    if (!formData.message) {
      newErrors.message = 'Message is required.'
      valid = false
    }
    if (!fileData) {
      newErrors.file = 'Please select a file.'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/submitCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      console.log(result)
      router.push('/karir')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-h6-desktop font-bold text-grey-800'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label
                className='text-subtle-desktop font-medium text-grey-800'
                htmlFor='name'
              >
                Nama
              </Label>
              <Input
                id='name'
                placeholder='Name of your project'
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className='text-red-500'>{errors.name}</span>}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label
                className='text-subtle-desktop font-medium text-grey-800'
                htmlFor='phone'
              >
                No. HP
              </Label>
              <Input
                id='phone'
                placeholder='phone number'
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <span className='text-red-500'>{errors.phone}</span>}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label
                className='text-subtle-desktop font-medium text-grey-800'
                htmlFor='email'
              >
                Email
              </Label>
              <Input
                id='email'
                placeholder='input email'
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className='text-red-500'>{errors.email}</span>}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label
                className='text-subtle-desktop font-medium text-grey-800'
                htmlFor='message'
              >
                Pesan anda
              </Label>
              <Textarea
                id='message'
                placeholder='Type your Message Here'
                onChange={handleInputChange}
                value={formData.message}
              />
              {errors.message && <span className='text-red-500'>{errors.message}</span>}
              <p className='text-subtle-desktop text-grey-700'>Please describe yourself into small paragraf</p>
            </div>
            <div className='flex flex-col gap-2'>
              <Label
                className='my-auto text-subtle-desktop font-medium text-grey-800'
                htmlFor='file'
              >
                Resume
              </Label>
              <div className='relative w-full max-w-sm items-center'>
                <Input
                  id='file'
                  type='file'
                  className='absolute size-full opacity-0'
                  onChange={handleFileChange}
                />
                <div className='flex w-full items-center rounded-md border p-2'>
                  <span className='text-placeholderColor'>{fileName}</span>
                  <Button
                    type='submit'
                    size='sm'
                    variant='tertiary'
                    className='z-10 ml-auto'
                    onClick={handleFileUpload}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
                {errors.file && <span className='text-red-500'>{errors.file}</span>}
                <p className='text-subtle-desktop text-grey-700'>Press upload button to submit file</p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          size='sm'
          variant='primary'
          onClick={handleSubmit}
          disabled={!formData.fileId || isLoading}
        >
          <div className='font-bold'>{isLoading ? 'Submitting...' : 'Kirim'}</div>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CareerForm
