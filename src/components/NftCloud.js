import * as React from 'react'
import { Scene } from './Scene'
import { Canvas } from '@react-three/fiber'
import { useDispatch, useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core'
import { fetchData } from '../store/dataSlice'

export function NftsCloud() {
  const { account } = useEthers()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data.items)
  const status = useSelector((state) => state.data.status)
  const error = useSelector((state) => state.data.error)

  const radius = 2

  const nfts = React.useMemo(
    () =>
      data && data.length
        ? data.map((entry, index) => {
            const offset = (-0.5 + Math.random()) * 1
            const angle = (index * (2 * Math.PI)) / data.length
            const position = [radius * Math.cos(angle) + offset, radius * Math.sin(angle) + offset, Math.random()]

            return {
              ...entry,
              position,
            }
          })
        : [],
    [data]
  )

  React.useEffect(() => {
    if (account) {
      dispatch(fetchData())
    }
  }, [dispatch, account])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className="canvas-container">
      <Canvas>
        <React.Suspense fallback={null}>
          <ambientLight />
          <Scene nfts={nfts} />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
