export interface TataKelolaPerusahaanType {
  title: string
  description: string
  tabs: TabsTataKelolaPerusahaanType[]
}

interface TabsTataKelolaPerusahaanType {
  id: number
  title: string
  value: string
  content: ContentTataKelolaPerusahaanType[]
}

export interface ContentTataKelolaPerusahaanType {
  id: number
  title: string
  description: string
}

export interface TataKelolaContent {
  id: number
  title: string
  description: string
}

export interface TataKelolaTabs {
  id: number
  title: string
  value: string
  content: TataKelolaContent[] | []
}

export interface TataKelolaTranslations {
  id: number
  data_kelola_id: number
  languages_code: string
  title: string
  description: string
  tabs: TataKelolaTabs[]
}

export interface TataKelolaType {
  id: number
  translations: TataKelolaTranslations[]
}
