import { StaticImageData } from 'next/image'

export interface AnggotaPerusahaanSubData {
  id: number
  name: string
  role: string
  riwayat: { pendidikan: string; jabatan: string; afiliasi: string }[]
}

export interface AnggotaPerusahaanTranslations {
  id: number
  anggota_perusahaan_id: number
  languages_code: string
  title: string
  data: AnggotaPerusahaanSubData[]
}
export interface AnggotaPerusahaanType {
  id: number
  translations: AnggotaPerusahaanTranslations[]
}

export interface DataAnggotaPerusahaanProps {
  id: number
  title: string
  data: AnggotaPerusahaanProfile[]
}

export interface AnggotaPerusahaanProfile {
  id: number
  name: string
  role: string
  riwayat: { pendidikan: string; jabatan: string; afiliasi: string }
}

export interface DewanKomiteSubData {
  id: number
  title: string
  description: string
}

export interface DewanKomiteTransations {
  id: number
  data_dewan_komite_id: number
  languages_code: string
  description: string
  title: string
  item: DewanKomiteSubData[]
}

export interface DewanKomiteType {
  id: number
  translations: DewanKomiteTransations[]
}

export interface DataDewanKomiteProps {
  id: number
  description: string
  title: string
  item: SubDewanKomiteProps[]
}

export interface SubDewanKomiteProps {
  id: number
  title: string
  description: string
}

export interface LembagaPendukungTranslations {
  id: number
  lembaga_pendukung_id: number
  languages_code: string
  title: string
  contact: string
  address: string
}

export interface LembagaPendukungType {
  id: number
  translations: LembagaPendukungTranslations[]
}

export interface PiagamAuditInternalTranslations {
  id: number
  piagam_audit_id: number
  languages_code: string
  title: string
  description: string
}

export interface PiagamAuditInternalType {
  id: number
  file: string
  translations: PiagamAuditInternalTranslations[]
}

export interface DokumenAnggaranPasarTranslations {
  id: number
  dokumen_anggaran_pasar_id: number
  languages_code: string
  title: string
}
export interface DokumenAnggaranPasarType {
  id: number
  file: string
  translations: DokumenAnggaranPasarTranslations[]
}

export interface DokumenAnggaranPasarTemp {
  id: number
  title: string
  file: string
}
export interface StrukturPerusahaanTranslations {
  id: number
  struktur_perusahaan_id: number
  languages_code: string
  title: string
}
export interface StrukturPerusahaanType {
  id: number
  content: string
  translations: StrukturPerusahaanTranslations[]
}

export interface DataStrukturPerusahaanProps {
  id: number
  title: string
  content: string
  value: string
}

export interface TentangPerjalananKamiTranslations {
  id: number
  perjalanan_kami_id: number
  languages_code: string
  title: string
  description: string
}

export interface TentangPerjalananKamiType {
  id: number
  title: string
  image: string
  bannerImage: string
  description: string
  translations: TentangPerjalananKamiTranslations[]
}

export interface PendirianPerseroanTranslations {
  id: number
  pendirian_perseroan_id: number
  languages_code: string
  title: string
  year: string
  description: string
}
export interface PendirianPerseroanType {
  id: number
  backgroundImage: string
  translations: PendirianPerseroanTranslations[]
}

export interface VisiDanMisiItem {
  title: string
  id: number
  description: string
}

export interface VisiDanMisiItemSub {
  title: string
  id: number
  icon: string
  description: string
}
export interface VisiDanMisiTranslations {
  id: number
  visi_dan_misi_id: number
  languages_code: string
  title: string
  description: string
  itemMission: VisiDanMisiItem[]
  subtitle: string
  itemSub: VisiDanMisiItemSub[]
}

export interface VisiDanMisiType {
  id: number
  image: string
  translations: VisiDanMisiTranslations[]
}

export interface DataTentangPerjalananKamiProps {
  title: string
  image: string | StaticImageData
  bannerImage: string | StaticImageData
  description: string
}

export interface DataPendirianPerseroanProps {
  list: DataPendirianPerseroanList[]
  subData: DataPendirianPerseroanSubData
}

export interface DataPendirianPerseroanList {
  id: number
  title: string
  year: string
  description: string
  backgroundImage: string
}

export interface DataPendirianPerseroanSubData {
  description: string
  item: { id: number; year: string; list: SubDataList[] }[]
}

export interface SubDataList {
  id: number
  caption: string
}

export interface DataVisiDanMisiProps {
  title: string
  description: string
  itemMission: DataMissionVisiProps[]
  subtitle: string
  itemSub: ItemSubVisiProps[]
}

export interface DataMissionVisiProps {
  id: number
  title: string
  description: string
}

export interface ItemSubVisiProps {
  id: number
  title: string
  description: string
  icon: string
}

export interface DataPiagamAuditInternalProps {
  title: string
  description: string
  file: string
}
