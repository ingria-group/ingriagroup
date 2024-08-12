import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { BidangUsahaData } from '@/data/BidangUsahaData'

const BidangUsaha = () => {
  const router = useRouter()

  useEffect(() => {
    if (BidangUsahaData.length > 0) {
      router.push(`/bidang-usaha/${BidangUsahaData[0].path}`)
    }
  }, [router])

  return <div>Loading...</div>
}

export default BidangUsaha
