export interface IkhtisarKeuanganTranslations {
  id: number
  ikhtisar_keuangan_data_id: number
  languages_code: string
  title: string
  description: string
}

export interface DataTableTranslations {
  id: number
  data_table_investor_id: number
  languages_code: string
  subTitle: string
}

export interface DataListTranslations {
  id: number
  sub_data_ikhtisar_id: number
  languages_code: string
  title: string
}

export interface IkhtisarKeuanganType {
  id: number
  translations: IkhtisarKeuanganTranslations[]
  data: DataListType[]
}

export interface DataListType {
  id: number
  translations: DataListTranslations[]
  value: string
  dataTable: DataTableType[]
}

export interface DataTableType {
  id: number
  sub_data_ikhtisar_id: number
  translations: DataTableTranslations[]
  content: contentDataType[]
}

export interface contentDataType {
  id: number
  tahun: string
  value: string
}

export interface LaporanKeuanganDataType {
  id: number
  tahun: string
  data: LaporanType[]
}

export interface LaporanTranslations {
  id: number
  languages_code: string
  title: string
}

export interface LaporanType {
  id: number
  translations: LaporanTranslations[]
  file: string
}

export interface InformasiPasarModalTranslations {
  id: number
  infromasi_pasar_modal_data_id: number
  languages_code: string
  kategori: string
}

export interface InformasiPasarModalType {
  id: number
  informasi_pasar_modal_id: number
  kategori: string
  value: string
  saham: string
  kepemilikan: string
  translations: InformasiPasarModalTranslations[]
}

export interface PengumumanDanPemanggilanTranslations {
  id: number
  pengumuman_dan_pemanggilan_id: number
  languages_code: string
  title: string
}

export interface PengumumanDanPemanggilanType {
  id: number
  translations: PengumumanDanPemanggilanTranslations[]
  content: ContentType[]
}

export interface ContentTranslations {
  id: number
  pengumuman_dan_pemanggilan_id: number
  languages_code: string
  title: string
}

export interface ContentType {
  id: number
  src: string
  pengumuman_dan_pemanggilan_id: number
  translations: ContentTranslations[]
}

export interface BahanMataAcaraType {
  id: number
  tahun: string
  data: LaporanType[]
}

export interface RingkasanRisalahType {
  id: number
  tahun: string
  data: LaporanType[]
}

export interface InformasiUntukInvestorType {
  id: number
  tahun: string
  data: LaporanType[]
}
