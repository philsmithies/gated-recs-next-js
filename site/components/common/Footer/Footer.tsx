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
      <Container className="bg-white">
        <div className="relative border-t border-b border-black border-opacity-5 font-typewriter ">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 py-14 md:grid-cols-3 md:px-8">
            <div className=" font-typewriter">
              <h2 className="mb-4 text-lg font-medium uppercase text-black">
                FOLLOW
              </h2>
              <Link href="https://gatedrecordings.bandcamp.com/" passHref>
                <svg
                  className="fill-black hover:fill-yellow-300 hover:cursor-pointer transition-colors"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="50px"
                  height="50px"
                >
                  <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M29.36,32H13l7.64-14H37L29.36,32z" />
                </svg>
              </Link>
            </div>
            <div>
              <form className="flex flex-col">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full border-2 py-3 bg-black px-2 hover:border-yellow-400 focus:outline-none focus:border-yellow-400"
                />
                <button className="mt-6 ml-2 md:ml-0 self-start text-sm hover:text-yellow-400 hover:bg-black border-2 border-black text-black hover:border-yellow-400 py-2 px-4">
                  SUBSCRIBE
                </button>
              </form>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-medium uppercase text-black">
                Contact
              </h2>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center text-sm font-medium text-black hover:text-yellow-400">
                  <a href="emailto:phil@phil.com">GET IN TOUCH</a>
                </li>
                <li className="flex items-center text-sm font-medium text-black hover:text-yellow-400">
                  <a href="https://gatedrecordings.bandcamp.com/">BANDCAMP</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-2 px-4 md:px-8">
          <p className="font-typewriter text-black">
            © {new Date().getFullYear()} Gated Recordings
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
