import { Play } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { DataVideoType } from '@/modules/home/WeHaveWhat'
import Icons from '@/utils/Icons'
import useLanguage from '@/utils/useLanguage'

interface VideoPlayerProps {
  data: DataVideoType
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const language = useLanguage()
  const dataTranslation = data.translations.find((i) => i.languages_code === language)

  const handlePlay = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.play()
    }
  }, [isModalOpen])

  return (
    <div className='relative max-w-full'>
      {/* Thumbnail and overlay content */}
      <div className='relative'>
        <div
          className='relative h-10 w-full cursor-pointer md:h-[700px]'
          onClick={handlePlay}
        >
          <Image
            src={'https://ingria.fly.dev/assets/' + data.thumbnail}
            alt='thumbnail'
            className='w-full'
            layout='fill'
            objectFit='cover'
          />
          <div className='absolute inset-0 flex items-center justify-center bg-black opacity-50'>
            <button className='rounded-full bg-slate-500 p-2 md:p-4'>
              <Play
                className='size-4 md:size-6'
                color='white'
                fill='white'
              />
            </button>
          </div>
          <div className='absolute left-[5%] top-5 w-[38%] text-white md:left-[15%] md:top-[40%] md:w-1/4'>
            <div className='box-content'>
              <div className='mb-5 text-start text-h3-mobile font-bold md:text-h3-desktop'>
                {dataTranslation?.title}
              </div>
              <p className='text-subtle-mobile font-medium md:text-subtle-desktop'>{dataTranslation?.description}</p>
            </div>
          </div>
          <div className='absolute right-[5%] top-5 grid grid-rows-2 gap-2 md:right-[15%] md:top-[30%] md:gap-6'>
            {data.content.map((i) => (
              <div
                className='box-content rounded-xl bg-primary-600 p-2 text-white md:p-[24px]'
                key={i.id}
              >
                <Icons
                  name={i.icon}
                  size={20}
                  color='white'
                />
                <div className='text-h3-mobile font-extrabold md:text-h3-mobile'>{i.value}</div>
                <p className='text-h6-mobile font-semibold md:text-h6-desktop'>{i.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for video playback */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='relative w-full max-w-4xl'>
            <button
              className='absolute right-4 top-4 text-2xl text-white'
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <video
              ref={videoRef}
              className='w-full'
              loop
              muted
              playsInline
              controls
            >
              <source
                src={'https://ingria.fly.dev/assets/' + data.video}
                type='video/mp4'
              />
            </video>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
