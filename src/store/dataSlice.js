import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const searchParams = new URLSearchParams({
  owner: process.env.REACT_APP_WALLET_ADDRESS,
  withMetadata: true,
  pageSize: 100,
})

const url = new URL(
  `/nft/v3/${process.env.REACT_APP_API_KEY}/getNFTsForOwner?${searchParams}`,
  'https://eth-mainnet.g.alchemy.com'
)

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch(url)
  const data = await response.json()

  return data
})

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading'
    })

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'succeeded'
      const transformedData = action.payload.ownedNfts
        ?.filter(({ image }) => image.pngUrl)
        .map(({ name, description, image, tokenId }) => ({
          name,
          description,
          image: `${image.pngUrl}.png`,
          tokenId,
        }))

      state.items = transformedData
    })

    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },
})

export const { reducer: dataReducer } = dataSlice
