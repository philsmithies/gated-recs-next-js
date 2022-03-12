import React, { createContext, useState } from 'react'
import axios from 'axios'

interface BtcContextInterface {
  btcOn: boolean
  toggleBtcOn: (btc: boolean) => void
  btcPrice: number | null
}

const BtcContext = createContext<BtcContextInterface | null>(null)

function BtcModeProvider(props: any) {
  const [btcOn, setBtcOn] = useState(false)
  const [btcPrice, setBtcPrice] = useState(null)
  const toggleBtcOn = (btc: boolean) => {
    setBtcOn(!btcOn)
  }

  axios
    .get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=gbp'
    )
    .then(
      (response) => {
        setBtcPrice(response.data.bitcoin.gbp)
      },
      (error) => {
        console.log(error)
      }
    )

  return (
    <div>
      <BtcContext.Provider value={{ btcOn, toggleBtcOn, btcPrice }}>
        {props.children}
      </BtcContext.Provider>
    </div>
  )
}

export { BtcContext, BtcModeProvider }
