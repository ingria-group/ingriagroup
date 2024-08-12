import { StaticImageData } from 'next/image'

export interface ContentBeritaDanArtikel {
  id: number
  title: string
  htmlContent: string
}
export interface SubDataBeritaDanArtikel {
  id: number
  berita_dan_artikel_id: number
  title: string
  image: string
  content: ContentBeritaDanArtikel[]
}

export interface BeritaDanArtikelTranslations {
  id: number
  title: string
  Berita_dan_artikel_id: number
  languages_code: number
  data: SubDataBeritaDanArtikel[]
}
export interface BeritaDanArtikelType {
  id: number
  path: string
  translations: BeritaDanArtikelTranslations[]
}

export interface SubBeritaDanArtikelType {
  id: number
  title: string
  image: string | StaticImageData
  content: ContentBeritaDanArtikel[]
}
