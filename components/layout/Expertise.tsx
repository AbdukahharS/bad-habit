import Image from 'next/image'
import React from 'react'

const Expertise = () => {
  return (
    <section className='px-8 py-10 md:px-12 md:py-20 xl:py-24'>
      <h2 className='text-5xl sm:text-7xl font-bold text-center mb-12'>
        My Expertise
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1100px] mx-auto gap-4 md:gap-0'>
        <div className='flex flex-col border py-10 px-8'>
          <div className='flex items-center gap-5 mb-2'>
            <Image
              src='/icons/desktop.svg'
              width={50}
              height={50}
              alt='Desktop'
            />
            <h5 className='text-2xl font-semibold'>
              <span className='after:block after:absolute after:w-[calc(100%+4px)] after:bg-pink-500/80 after:h-2 after:bottom-1 relative z-[1] after:z-[-1] after:left-[-2px]'>
                Software
              </span>{' '}
              Development
            </h5>
          </div>
          <div className='pl-9 after:h-[65%] after:opacity-[0.3] after:absolute after:top-[17%] after:left-4 after:border relative'>
            <p className="before:content-['<h3>'] before:mb-1 before:block before:opacity-30 before:ml-[-35px] after:content-['<h3>'] after:mt-1 after:block after:opacity-30 after:ml-[-35px]">
              Experienced in both functional and OOP: JavaScript, TypeScript.
            </p>
          </div>
        </div>
        <div className='flex flex-col border py-10 px-8'>
          <div className='flex items-center gap-5 mb-2'>
            <Image
              src='/icons/react.svg'
              width={50}
              height={50}
              alt='Desktop'
            />
            <h5 className='text-2xl font-semibold'>
              <span className='after:block after:absolute after:w-[calc(100%+4px)] after:bg-blue-500/80 after:h-2 after:bottom-1 relative z-[1] after:z-[-1] after:left-[-2px]'>
                Frontend Dev
              </span>{' '}
              React, NextJS
            </h5>
          </div>
          <div className='pl-9 after:h-[65%] after:opacity-[0.3] after:absolute after:top-[17%] after:left-4 after:border relative'>
            <p className="before:content-['<h3>'] before:mb-1 before:block before:opacity-30 before:ml-[-35px] after:content-['<h3>'] after:mt-1 after:block after:opacity-30 after:ml-[-35px]">
              Passionate about complex designs. Over 2 years of development
              experience in HTML, CSS, JS, React and NextJS frameworks.
            </p>
          </div>
        </div>
        <div className='flex flex-col border py-10 px-8'>
          <div className='flex items-center gap-5 mb-2'>
            <Image src='/icons/node.svg' width={50} height={50} alt='Desktop' />
            <h5 className='text-2xl font-semibold'>
              <span className='after:block after:absolute after:w-[calc(100%+4px)] after:bg-green-500/80 after:h-2 after:bottom-1 relative z-[1] after:z-[-1] after:left-[-2px]'>
                NodeJS Dev
              </span>{' '}
            </h5>
          </div>
          <div className='pl-9 after:h-[65%] after:opacity-[0.3] after:absolute after:top-[17%] after:left-4 after:border relative'>
            <p className="before:content-['<h3>'] before:mb-1 before:block before:opacity-30 before:ml-[-35px] after:content-['<h3>'] after:mt-1 after:block after:opacity-30 after:ml-[-35px]">
              Skilled in Backend development with Node.js and building
              cross-platform desktop apps using Electron.js, optimizing
              automation for small businesses.
            </p>
          </div>
        </div>
        <div className='p-6 justify-center items-center hidden md:flex lg:hidden'>
          <blockquote className='border-l-8 border-violet-600 pl-5'>
            <p className='text-2xl font-semibold mb-4'>
              “No two things have been combined better than knowledge and
              patience.”
            </p>
            <cite>- Prophet Muhammad (peace be upon him)</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default Expertise
