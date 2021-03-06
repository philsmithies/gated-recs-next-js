import cn from 'clsx'
import Image from 'next/image'
import s from './ProductView.module.css'
import { FC, useContext } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
import { BtcContext } from 'context/BtcContext'
import { useAddItem } from '@framework/cart'
import { useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import { Button, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import Link from 'next/link'
interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])
  const variant = getProductVariant(product, selectedOptions)

  const { price } = usePrice({
    amount: variant ? variant.price : product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const btcContext = useContext(BtcContext)

  return (
    <>
      <Container className="max-w-none w-full p-16 grainy" clean>
        <Link href="/" passHref>
          <p className="bg-black text-center mb-4 border border-white hover:bg-yellow-400 hover:text-black transition-colors text-white w-28 py-2 px-2 uppercase font-typewriter cursor-pointer">
            GO BACK
          </p>
        </Link>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
            <ProductTag
              name={product.name}
              fontSize={32}
              price={
                !btcContext?.btcOn
                  ? `${price} ${product.price?.currencyCode}`
                  : `???${btcContext.conversion(product.price.value).toFixed(8)}`
              }
            />

            <div className={s.sliderContainer}>
              <ProductSlider key={product.id}>
                {product.images.map((image, i) => (
                  <div key={image.url} className={s.imageContainer}>
                    <Image
                      className={s.img}
                      src={image.url!}
                      alt={image.alt || 'Product Image'}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"
                    />
                  </div>
                ))}
              </ProductSlider>
            </div>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
          </div>

          <ProductSidebar
            key={product.id}
            product={product}
            className={s.sidebar}
          />
        </div>
        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10">
          <Text
            variant="sectionHeading"
            className="uppercase font-typewriter font-bold"
          >
            Related Products
          </Text>
          <div className={s.relatedProductsGrid}>
            {relatedProducts.map((p) => (
              <div key={p.path} className="animated fadeIn">
                <ProductCard
                  noNameTag
                  product={p}
                  key={p.path}
                  variant="related"
                  className="animated fadeIn transition-transform "
                  imgProps={{
                    width: 300,
                    height: 300,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
