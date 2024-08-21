import { Play, Pause } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import { DataVideoType } from '@/modules/home/WeHaveWhat'
import Icons from '@/utils/Icons'
import useLanguage from '@/utils/useLanguage'

interface VideoPlayerProps {
  data: DataVideoType
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const language = useLanguage()
  const dataTranslation = data.translations.find((i) => i.languages_code === language)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMouseEnter = () => {
    setShowControls(true)
  }

  const handleMouseLeave = () => {
    setShowControls(false)
  }

  return (
    <div
      className='relative max-w-full'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className='absolute inset-0 z-0 h-full w-full object-cover'
        src={'https://ingria.fly.dev/assets/' + data.video}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content Overlay */}
      <div className='relative z-10'>
        <div className='relative h-10 w-full cursor-pointer md:h-[700px]'>
          {/* Play/Pause Button */}
          {showControls && (
            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <button
                className='rounded-full bg-slate-500 p-2 md:p-4'
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause
                    className='size-4 md:size-6'
                    color='white'
                  />
                ) : (
                  <Play
                    className='size-4 md:size-6'
                    color='white'
                  />
                )}
              </button>
            </div>
          )}

          {/* Video Details */}
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
    </div>
  )
}

export default VideoPlayer
