import { FC, useContext } from 'react'
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import { BtcContext } from '../../../context/BtcContext'
interface NavbarProps {
  links?: LinkProps[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const btcContext = useContext(BtcContext)

  const handleClick = () => {
    btcContext?.toggleBtcOn()
  }

  return (
    <NavbarRoot>
      <Container>
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <Link href="/" passHref>
              <img
                src="/logo.png"
                alt="logo banner"
                className="h-24 hover:bg-yellow-500 transition-colors hover:cursor-pointer"
              />
              {/* <p className="bg-black pt-1 font-typewriterHeading uppercase text-3xl font-bold tracking-widest hover:bg-black hover:text-yellow-500 hover:cursor-pointer">
              gated
            </p> */}
            </Link>

            {/* <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <Logo />
            </a>
          </Link> */}
            {/* <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>All</a>
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))}
          </nav> */}
          </div>
          {/* {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>
        )} */}

          <div className="flex items-center justify-end flex-1 space-x-8">
            <div className="bg-black flex p-1 items-center font-typewriter">
              <p className="text-white mr-1">GBP</p>
              <label className={s.switch}>
                <input
                  type="checkbox"
                  checked={btcContext?.btcOn}
                  onClick={handleClick}
                />
                <span className={s.slider}></span>
              </label>
              <p className="text-white ml-1">BTC</p>
            </div>
            <UserNav />
          </div>
        </div>
        {/* {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      )} */}
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
