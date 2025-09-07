import { Quote, MessageCircle, Linkedin, Send, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-32 md:mt-36 relative overflow-hidden'>
      {/* Subtle background gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-background via-[#0f0f0f] to-black opacity-80'></div>
      
      <div className='relative w-full mx-auto flex flex-col-reverse xl:flex-row items-stretch'>
        {/* Contact Section */}
        <div className='w-full xl:w-[45%] flex justify-center p-10 flex-col relative'>
          <div className='space-y-6'>
            <h3 className='text-2xl sm:text-4xl font-bold text-white font-poppins leading-tight'>
              Let&apos;s build something amazing together
            </h3>
            <p className='sm:text-xl font-medium text-gray-300 leading-relaxed'>
              Have an exciting project you need help with? Send me an email or contact me via instant message!
            </p>
          </div>
          
          <div className='w-full h-20 hidden md:block'></div>
          
          <div className='space-y-4' id='contact'>
            <Link
              href='mailto:shahzod@abdukahhar.uz'
              className='group relative inline-block text-lg sm:text-2xl font-semibold text-white transition-all duration-300'
            >
              <span className='relative z-10 sm:hidden'>Email</span>
              <span className='relative z-10 hidden sm:inline'>
                shahzod@abdukahhar.uz
              </span>
              <div className='absolute inset-x-0 bottom-1 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-70'></div>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300'></div>
            </Link>
            
            <div className='grid grid-cols-2 gap-4 pt-4'>
              {[
                { 
                  href: 'https://wa.me/998881630804', 
                  label: 'WhatsApp', 
                  icon: <MessageCircle className='w-5 h-5' />,
                  color: 'green'
                },
                { 
                  href: 'https://www.linkedin.com/in/shahzod-kahhorov/', 
                  label: 'LinkedIn', 
                  icon: <Linkedin className='w-5 h-5' />,
                  color: 'blue'
                },
                { 
                  href: 'https://t.me/shahzod_qaxxorov', 
                  label: 'Telegram', 
                  icon: <Send className='w-5 h-5' />,
                  color: 'cyan'
                },
                { 
                  href: 'https://github.com/AbdukahharS', 
                  label: 'GitHub', 
                  icon: <Github className='w-5 h-5' />,
                  color: 'purple'
                }
              ].map(({ href, label, icon, color }) => (
                <Link
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`group flex items-center gap-3 p-3 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                    color === 'green' ? 'bg-green-500/5 hover:bg-green-500/10 hover:border-green-400/50' :
                    color === 'blue' ? 'bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-400/50' :
                    color === 'cyan' ? 'bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/50' :
                    'bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-400/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                    color === 'green' ? 'bg-green-500/10 border-green-400/30 text-green-400 group-hover:text-green-300 group-hover:bg-green-500/20' :
                    color === 'blue' ? 'bg-blue-500/10 border-blue-400/30 text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/20' :
                    color === 'cyan' ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/20' :
                    'bg-purple-500/10 border-purple-400/30 text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/20'
                  }`}>
                    {icon}
                  </div>
                  <span className='font-medium text-gray-300 group-hover:text-white transition-colors duration-300'>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className='w-full xl:w-[55%] flex flex-col md:flex-row gap-4 p-6'>
          {/* First testimonial - larger */}
          <div className='w-full md:w-1/2 space-y-4'>
            <div className='group p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02]'
                 style={{
                   background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                 }}>
              <div className='flex flex-row items-start justify-between mb-4'>
                <Quote className='w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300' />
                <div className='w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400/50 group-hover:border-purple-300 transition-colors duration-300'>
                  <Image
                    src='/testimonials/default.png'
                    width={64}
                    height={64}
                    alt='Default user picture'
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
              <p className='text-gray-300 leading-relaxed mb-4 group-hover:text-white transition-colors duration-300'>
                Shahzod showed his skills in programming using different technical
                applications. In addition to being impressed by his unfailing
                attention and excellent degree of technical skills, I have been
                pleased with our working relationship. As a client, I was
                astounded by his one specific character as he was a &quot;show,
                don&apos;t just tell&quot; type of partner.
              </p>
              <div>
                <p className='text-xl font-bold text-white font-poppins'>- Sabrina Narzullaeva</p>
                <span className='text-purple-300 font-medium text-sm'>
                  Marketing Specialist at Founders
                </span>
              </div>
            </div>
          </div>
          
          {/* Right column with two testimonials */}
          <div className='w-full md:w-1/2 space-y-4'>
            <div className='group p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:scale-[1.02]'
                 style={{
                   background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                 }}>
              <div className='flex flex-row items-start justify-between mb-3'>
                <Quote className='w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300' />
                <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/50 group-hover:border-blue-300 transition-colors duration-300'>
                  <Image
                    src='/testimonials/abdulaziz.png'
                    width={48}
                    height={48}
                    alt='Abdulaziz Abdumutalibov'
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
              <p className='text-gray-300 text-sm leading-relaxed mb-3 group-hover:text-white transition-colors duration-300'>
                Shahzod built my personal website, and I&apos;m thrilled with
                the result. He understood my needs, delivered a beautiful site,
                and made the process easy. Highly recommend!
              </p>
              <div>
                <p className='font-bold text-white font-poppins text-sm'>- Abdulaziz Abdumutalibov</p>
                <span className='text-blue-300 font-medium text-xs'>
                  Co-founder of WeDo Consulting Agency
                </span>
              </div>
            </div>
            
            <div className='group p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-pink-400/50 transition-all duration-500 hover:scale-[1.02]'
                 style={{
                   background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                 }}>
              <div className='flex flex-row items-start justify-between mb-3'>
                <Quote className='w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors duration-300' />
                <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-pink-400/50 group-hover:border-pink-300 transition-colors duration-300'>
                  <Image
                    src='/testimonials/bilalibntuygun.png'
                    width={48}
                    height={48}
                    alt='Bilal ibn Tuygun'
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
              <p className='text-gray-300 text-sm leading-relaxed mb-3 group-hover:text-white transition-colors duration-300'>
                It was a delight to work with my website developer. His
                technological know-how, meticulous attention to detail, and
                commitment produced a modern, useful website that precisely
                embodies my vision. I heartily urge anyone looking for a
                qualified and experienced web developer to use his services
              </p>
              <div>
                <p className='font-bold text-white font-poppins text-sm'>- Bilal ibn Tuygun</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
