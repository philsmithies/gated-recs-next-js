import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

interface BtcContextInterface {
  btcOn: boolean
  toggleBtcOn: () => void
  btcPrice: number
  conversion: (value: number) => number
}

const BtcContext = createContext<BtcContextInterface | null>(null)

function BtcModeProvider(props: any) {
  const [btcOn, setBtcOn] = useState(false)
  const [btcPrice, setBtcPrice] = useState(0)
  const toggleBtcOn = () => {
    setBtcOn(!btcOn)
  }

  const conversion = (value: number) => {
    return (1 / btcPrice) * value
  }

  useEffect(() => {
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
  }, [])

  const BtcAppContext: BtcContextInterface = {
    btcOn,
    btcPrice,
    toggleBtcOn,
    conversion,
  }

  return (
    <div>
      <BtcContext.Provider value={BtcAppContext}>
        {props.children}
      </BtcContext.Provider>
    </div>
  )
}

export { BtcContext, BtcModeProvider }
