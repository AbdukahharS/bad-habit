import { Quote } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#0e0e0e] mt-32 md:mt-36'>
      <div className='w-full  mx-auto flex flex-col-reverse xl:flex-row items-stretch '>
        <div className='w-full xl:w-[45%] flex justify-center p-10 flex-col'>
          <div>
            <h3 className='text-2xl sm:text-4xl font-bold'>
              Available for select freelance opportunities
            </h3>
            <p className='my-6 sm:text-xl font-semibold'>
              Have an exciting project you need help with? Send me an email or
              contact me via instant message!
            </p>
          </div>
          <div className='w-full h-20 hidden md:block'></div>
          <div className='text-lg sm:text-2xl font-semibold' id='contact'>
            <Link
              href='mailto:shahzod@abdukahhar.uz'
              className='relative after:absolute after:w-[105%] after:h-2 after:bg-purple-400/70 after:bottom-[10%] after:left-0 after:translate-x-[-2.5%] z-10 after:z-[-1] after:block after:transition-all hover:after:h-full'
            >
              <span className='sm:hidden'>Email</span>
              <span className='hidden sm:inline'>
                shahzod@abdukahhar.uz
              </span>
            </Link>
            <br />
            <br />
            <Link
              href='https://wa.me/601131578589'
              className='transition-colors duration-300 hover:text-blue-400'
            >
              WhatsApp
            </Link>
            <br />
            <Link
              href='https://www.linkedin.com/in/shahzod-kahhorov/'
              className='transition-colors duration-300 hover:text-blue-400'
            >
              LinkedIn
            </Link>
            <br />
            <Link
              href='https://t.me/shahzod_qaxxorov'
              className='transition-colors duration-300 hover:text-blue-400'
            >
              Telegram
            </Link>
            <br />
            <Link
              href='https://github.com/AbdukahharS'
              className='transition-colors duration-300 hover:text-blue-400'
            >
              GitHub
            </Link>
          </div>
        </div>
        <div className='w-full xl:w-[55%] flex flex-col md:flex-row'>
          <div className='bg-purple-500/80 p-7 w-full md:w-1/2'>
            <div className='flex flex-row items-start justify-between'>
              <Quote className='w-12 h-12' />
              <Image
                src='/testimonials/default.png'
                width={85}
                height={85}
                alt='Default user picture'
              />
            </div>
            <p className='my-3'>
              Shahzod showed his skills in programming using different technical
              applications. In addition to being impressed by his unfailing
              attention and excellent degree of technical skills, I have been
              pleased with our working relationship. As a client, I was
              astounded by his one specific character as he was a &quot;show,
              don&apos;t just tell&quot; type of partner.
            </p>
            <p className='text-xl font-semibold'>- Sabrina Narzullaeva</p>
            <span className='font-semibold opacity-80'>
              Marketing Specialist at Founders
            </span>
          </div>
          <div className='w-full md:w-1/2'>
            <div className='bg-blue-600/80 p-7 h-fit'>
              <div className='flex flex-row items-start justify-between'>
                <Quote className='w-12 h-12' />
                <Image
                  src='/testimonials/abdulaziz.png'
                  width={85}
                  height={85}
                  alt='Abdulaziz Abdumutalibov'
                />
              </div>
              <p className='my-3'>
                Shahzod built my personal website, and I&apos;m thrilled with
                the result. He understood my needs, delivered a beautiful site,
                and made the process easy. Highly recommend!
              </p>
              <p className='text-xl font-semibold'>- Abdulaziz Abdumutalibov</p>
              <span className='font-semibold opacity-80'>
                Co-founder of WeDo Consulting Agency
              </span>
            </div>
            <div className='bg-purple-600/80 p-7'>
              <div className='flex flex-row items-start justify-between'>
                <Quote className='w-12 h-12' />
                <Image
                  src='/testimonials/bilalibntuygun.png'
                  width={85}
                  height={85}
                  alt='Bilal ibn Tuygun'
                />
              </div>
              <p className='my-3'>
                It was a delight to work with my website developer. His
                technological know-how, meticulous attention to detail, and
                commitment produced a modern, useful website that precisely
                embodies my vision. I heartily urge anyone looking for a
                qualified and experienced web developer to use his services
              </p>
              <p className='text-xl font-semibold'>- Bilal ibn Tuygun</p>
              {/* <span className='font-semibold opacity-80'>
              Student at Inti International College
            </span> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
