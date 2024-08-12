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
const CardForm: React.FC<CardFormType> = ({ title }) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prevFromData) => ({ ...prevFromData, [id]: value }))
  }

  const validateForm = () => {
    let valid = true
    const newErrors = {
      name: '',
      phone: '',
      email: '',
      message: '',
    }

    if (!formData.name) {
      newErrors.name = 'Name is required'
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
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      router.push('/kontak')
      console.log(result)
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
        {/* <CardDescription>Card Description</CardDescription> */}
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
                htmlFor='Pesan'
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
              <p className='text-subtle-desktop text-grey-700'>Your Message will be copied</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          size='sm'
          variant='primary'
          onClick={handleSubmit}
          disabled={isLoading}
        >
          <div className='font-bold'>{isLoading ? 'Submitting...' : 'Kirim'}</div>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardForm
