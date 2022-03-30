import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Hero } from '@components/ui'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
export async function getServerSideProps({
  preview,
  locale,
  locales,
}: GetServerSidePropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
  }
}

export default function Home({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="p-5 py-20 h-full w-full grainy">
        <div className=" max-w-m sm:max-w-lg lg:max-w-4xl mx-auto">
          <Grid layout="normal">
            {products.map((product: any) => (
              <ProductCard
                key={product.path}
                product={product}
                variant="simple"
                imgProps={{
                  width: 480,
                  height: 480,
                }}
              />
            ))}
          </Grid>
        </div>
      </div>
    </>
  )
}

Home.Layout = Layout
