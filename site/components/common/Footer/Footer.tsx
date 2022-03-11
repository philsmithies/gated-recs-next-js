import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer role="contentinfo">
      <Container>
        <div className="relative border-t border-b border-black border-opacity-5 font-typewriter">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 py-14 md:grid-cols-3 md:px-8">
            <div className=" font-typewriter">
              <h2 className="mb-4 text-lg font-medium uppercase">FOLLOW</h2>
              <Link href="https://gatedrecordings.bandcamp.com/" passHref>
                <Image
                  src={'/bandcamplogo.svg'}
                  alt="Band Camp"
                  className="mr-2 hover:cursor-pointer"
                  width={50}
                  height={50}
                />
              </Link>
            </div>
            <div>
              <form className="flex flex-col">
                <input
                  type="text"
                  placeholder="ENTER YOUR EMAIL"
                  className="w-2/3 border-2 py-4 px-2"
                />
                <button className="mt-6 ml-2 self-start text-sm">
                  SUBSCRIBE
                </button>
              </form>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-medium uppercase">Contact</h2>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                  <a href="emailto:phil@phil.com">GET IN TOUCH</a>
                </li>
                <li className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                  <a href="https://gatedrecordings.bandcamp.com/">BANDCAMP</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" bg-black py-2 px-4 md:px-8">
          <p className="font-typewriter text-white">
            © {new Date().getFullYear()} Gated Records
          </p>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
