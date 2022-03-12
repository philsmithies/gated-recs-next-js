import cn from 'clsx'
import Link from 'next/link'
import { FC, useContext } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import { BtcContext } from 'context/BtcContext'

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()
  const btcContext = useContext(BtcContext)

  // const { price: subTotal } = usePrice(
  //   data && {
  //     amount: Number(data.subtotalPrice),
  //     currencyCode: data.currency.code,
  //   }
  // )

  const { price: total } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )

  const btcTotal = btcContext
    ?.conversion(Number(total.substring(total.indexOf('£') + 1)))
    .toFixed(8)

  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const error = null
  const success = null

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty,
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center font-typewriter">
            Your cart is empty
          </h2>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <a>
                <Text
                  variant="sectionHeading"
                  onClick={handleClose}
                  className="font-typewriter uppercase"
                >
                  Cart
                </Text>
              </a>
            </Link>
            <ul className={s.lineItemsList}>
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
            <ul className="pb-2">
              {/* <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{btcOn ? subTotal : btcTotal}</span>
              </li> */}
              <li className="flex justify-between py-1">
                <span>Shipping</span>
                <span className="font-bold tracking-wide">
                  Calculated At Checkout
                </span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
              <span>Total</span>
              <span>
                {btcContext?.btcOn ? (
                  <span>{total}</span>
                ) : (
                  <div>
                    <span className="text-yellow-500">฿</span>
                    <span> {btcTotal}</span>
                  </div>
                )}
              </span>
            </div>
            <div>
              {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Button Component="a" width="100%" onClick={goToCheckout}>
                  Proceed to Checkout ({total})
                </Button>
              ) : (
                <Button href="/checkout" Component="a" width="100%">
                  Proceed to Checkout
                </Button>
              )}
            </div>
            <li className="flex py-2 justify-center">
              {!btcContext?.btcOn ? (
                <span className="font-semibold tracking-wide text-center text-xs">
                  The Price in <span className="text-yellow-500">฿</span> Will
                  Be Shown At The Payment Page
                </span>
              ) : (
                ''
              )}
            </li>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
