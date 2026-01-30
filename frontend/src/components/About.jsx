import React from 'react'
import { apbranches, apstats, apteamMembers } from '../assets/dummydata'
import AboutUsImage from '../assets/AboutUsImage.png'
import { Facebook, Instagram, MapPin, Twitter, Clock } from 'lucide-react'

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f0fdfa] pt-24'>
      <section className='relative py-10 overflow-hidden'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='text-center mb-2 space-y-8'>
            <div className='relative inline-block'>
              <h1 className='text-5xl md:text-7xl font-black bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent mb-6 leading-tight'>
                Crafting Literary <br /> Futures
              </h1>
              <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full'/>
            </div>
            <p className='text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium'>
                Pioneering the next chapter in global storytelling. We bridge imagination with innovation through curated literary experience. 
            </p>
          </div>
        </div>
      </section>

      <section className='py-20 bg-gradient-to-br from-[#43C6AC]/5 via-[#F8FFAE]/5 to-[#43C6AC]/5'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {apstats.map((stat, index) => (
              <div key={index} className='bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-[#43C6AC]/10 transition-transform hover:-translate-y-2'>
                <div className='w-16 h-16 rounded-2xl bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] flex items-center justify-center mb-6 shadow-lg'>
                  <stat.icon className='h-8 w-8 text-white'/>
                </div>
                <h3 className='text-5xl font-black text-[#2B5876] mb-2'>{stat.value}</h3>
                <p className='text-lg font-medium text-gray-600'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='grid grid-col-1 lg:grid-cols-2 gap-16'>
            <div className='relative group overflow-hidden rounded-[2.5rem] shadow-2xl'>
              <img 
              src={AboutUsImage} 
              alt="About" 
              className=' w-full h-auto object-cover transform transition duration-700 group-hover:scale-105'/>
              <div className='absolute inset-0 bg-gradient-to-t from-[#43C6AC]/30 to-transparent'/>

              <div className='absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#2B5876]/80 to-transparent'>
                <h3 className='text-2xl font-bold text-white'>
                Since 2015
                </h3>
                <p className='text-gray-200'>
                  Pioneering Digital Literature
                </p>
              </div>
            </div>

            <div className='space-y-10'>
              <div className='space-y-6'>
                <h2 className='text-5xl font-black bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent'>
                  Redefining Storytelling
                </h2>
                <p className='text-lg text-gray-700 leading-relaxed'>
                  We've transformed traditional publishing into a dynamic digital ecosystem.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='p-6 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-[#43C6AC]/10'>
                  <h4 className='text-2xl font-bold text-[#2B5876] mb-3'>
                    Our Vision
                  </h4>
                  <p className='text-gray-600'>Create a global network.</p>
                </div>

                <div className='p-6 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-[#43C6AC]/10'>
                  <h4 className='text-2xl font-bold text-[#2B5876] mb-3'>
                    Our Mission
                  </h4>
                  <p className='text-gray-600'>Empower creators and inspire readers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* team */}
      <section className='py-20 bg-gradient-to-br from-[#43C6AC]/5 to-[#F8FFAE]/5'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='relative text-center mb-20'>
            <h2 className='text-5xl font-black bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent'>
              Meet Your Literary Guides 
            </h2>
            <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full'/>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
              {apteamMembers.map((member) => (
                <div key={member.id} className='group relative bg-white/95 backdrop-blur-lg rounded-[2rem] p-6 shadow-2xl border border-[#43C6AC]/10 transition-transform hover:-translate-y-3'>
                    <div className='relative overflow-hidden rounded-2xl mb-6'>
                      <img 
                      src={member.image} 
                      alt={member.name} 
                      className='w-full h-80 object-cover transform transition duration-500 group-hover:scale-110'/>
                    <div className='absolute inset-0 bg-gradient-to-t from-[#43C6AC]/40 to-transparent'/>
                    </div>
                    <h3 className='text-2xl font-bold text-gray-900 mb-1'>
                      {member.name}
                    </h3>
                    <p className='text-lg text-[#43C6AC] font-medium mb-6'>
                      {member.position}
                    </p>

                    <div className='flex justify-center space-x-4'>
                      {[Facebook, Twitter, Instagram].map((Icon, index) => (
                          <button 
                            key={index} 
                            className='cursor-pointer p-2 rounded-full bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] text-white hover:shadow-lg transition-all hover:scale-110'>
                              <Icon className='h-6 w-6'/>
                            </button>
                      ))}
                    </div>
                </div>
              ))}
          </div>
        </div>
      </section>

            { /* branches */}
      <section className='py-20'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='relative text-center mb-20'>
            <h2 className='text-5xl font-black bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent'>
              Our Literary Sanctuaries
            </h2>
            <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full'/>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {apbranches.map((branch, index) => (
                <div key ={index} className='bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-[#43C6AC]/10 transition-transform hover:-translate-y-2'>
                  <div className='relative h-56 rounded-xl overflow-hidden mb-6'>
                    <img 
                    src={branch.image} 
                    alt={branch.location} 
                    className='w-full h-full object-cover transform transition duration-500 hover:scale-110'/>
                    <div className='absolute inset-0 bg-gradient-to-t from-[#43C6AC]/30 to-transparent'/>
                  </div>

                  <div className='space-y-4'>
                    <div className='flex items-center space-x-3'>
                      <MapPin className='h-6 w-6 text-[#43C6AC]'/>
                      <h3 className='text-xl font-semibold text-[#2B5876]'>
                        {branch.location}
                      </h3>
                    </div>

                    <div className='flex items-center space-x-3 text-gray-600'>
                      <Clock className='h-6 w-6 text-[#43C6AC]'/>
                      <p>{branch.hours}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
