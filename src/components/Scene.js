import * as React from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { addToHistory } from '../store/historySlice'
import { useDispatch } from 'react-redux'

export function Scene({ nfts }) {
  const dispatch = useDispatch()
  const [activeId, setActiveId] = React.useState(undefined)
  const zoomPosition = [0, 0, 4]

  const textures = useLoader(
    TextureLoader,
    nfts.map(({ image }) => image)
  )

  const data = React.useMemo(
    () =>
      textures && textures.length
        ? textures.map((texture, index) => ({
            ...nfts[index],
            texture,
          }))
        : [],
    [textures]
  )

  function handleClick(event, nft) {
    event.stopPropagation()
    setActiveId(nft?.tokenId)

    if (nft) {
      const { texture, ...rest } = nft
      dispatch(addToHistory({ ...rest }))
    }
  }

  return data && data.length
    ? data.map((nft) => {
        const isActive = nft.tokenId === activeId

        return (
          <mesh
            key={nft.tokenId}
            position={isActive ? zoomPosition : nft.position}
            onClick={(event) => handleClick(event, isActive ? undefined : nft)}
          >
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial attach="material" map={nft.texture} />
          </mesh>
        )
      })
    : null
}
