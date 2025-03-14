import React from 'react'
import { ModeToggle } from './modeToggle'
import Logo from "../../../../../public/logo.png"
import Image from "next/image"
// import Logo from "/public/logo.png"

function Nav() {
  return (
    <>
      <div className="w-screen sticky top-0 left-0 z-20 h-20 bg-gradient-to-b   from-muted backdrop-blur-sm  flex p-5 ">
        <div className="container flex justify-between w-screen m-auto items-center">
          <Image src={Logo} alt="logo" width={50} />
          <ModeToggle />
        </div>
      </div>
    </>
  )
}

export default Nav
