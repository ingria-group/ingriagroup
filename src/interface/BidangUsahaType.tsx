export interface BidangUsahaProps {
  id: number
  title: string
  background: string
  image: string
  path: string
  description: string
  footer: string
  fasilitas: FasilitasProps[]
  kawasan: KawasanProps[]
}

export interface FasilitasProps {
  id: number
  title: string
}

export interface KawasanProps {
  id: number
  title: string
  estimate: string
}

export interface BidangUsahaFasiltas {
  id: number
  title: string
}

export interface BidangUsahaKawasan {
  id: number
  title: string
  estimate: string
}

export interface BidangUsahaTranslations {
  id: number
  bidang_usaha_data_id: number
  languages_code: string
  description: string
  footer: string
  fasilitas: BidangUsahaFasiltas[]
  kawasan: BidangUsahaKawasan[]
}

export interface BidangUsahaType {
  id: number
  background: string
  image: string
  path: string
  title: string
  translations: BidangUsahaTranslations[]
}
