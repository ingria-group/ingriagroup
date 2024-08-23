import React from 'react'

import VideoPlayer from '@/components/VideoPlayer'

export interface DataVideoType {
  id: number
  thumbnail: string
  video: string
  content: { id: number; icon: string; title: string; value: string; bg_color: string; text_color: string }[]
  translations: { id: number; data_video_id: number; languages_code: string; title: string; description: string }[]
}

interface DataVideoProps {
  dataVideo: DataVideoType
}

const WeHaveWhat: React.FC<DataVideoProps> = ({ dataVideo }) => {
  return (
    <div className='mt-6'>
      <VideoPlayer data={dataVideo} />
    </div>
  )
}

export default WeHaveWhat
