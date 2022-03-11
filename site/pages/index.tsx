import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
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
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="p-5 py-20 h-full max-w-m sm:max-w-lg lg:max-w-4xl mx-auto ">
        <Grid layout="normal">
          {products.map((product) => (
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
      {/* <Hero
        headline=" Gated Recs Is Where It Is At"
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      /> */}
    </>
  )
}

Home.Layout = Layout
