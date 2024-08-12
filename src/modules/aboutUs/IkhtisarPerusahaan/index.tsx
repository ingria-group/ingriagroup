import React from 'react'

import { PendirianPerseroanType, TentangPerjalananKamiType, VisiDanMisiType } from '@/interface/AboutUsType'
import Blank from '@/layouts/Blank'

import PendirianPerseroan from './PendirianPerseroan'
import TentangPerjalananKami from './TentangPerjalananKami'
import VisiDanMisi from './VisiDanMisi'

interface IkhtisarPerusahaanProps {
  tentangPerjalananKami: TentangPerjalananKamiType
  pendirianPerseroan: PendirianPerseroanType[]
  visiDanMisi: VisiDanMisiType
}

const IkhtisarPerusahaan: React.FC<IkhtisarPerusahaanProps> = ({
  pendirianPerseroan,
  tentangPerjalananKami,
  visiDanMisi,
}) => {
  return (
    <Blank title='ikhtisar perusahaan'>
      <TentangPerjalananKami tentangPerjalananKami={tentangPerjalananKami} />
      <PendirianPerseroan pendirianPerseroan={pendirianPerseroan} />
      <VisiDanMisi visiDanMisi={visiDanMisi} />
    </Blank>
  )
}

export default IkhtisarPerusahaan
