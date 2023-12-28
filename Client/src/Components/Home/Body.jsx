import React from 'react'

const Body = () => {
  return (
    <>
    <section className='grid grid-cols-5'>
      <div className='w-full pl-16 col-span-3 font-sans '>
        <div className='text-3xl mb-2 font-semibold'> 
            About the course
        </div>
        <p className='text-sm my-2'>
        Get empowered digitally and start earning wisely! Our course is designed  thoughtfully
        to empower every student <br /> to leverage the latest job opportunities. 
        Starting from the basics the course covers 
         all the major and widespread topics  that form the essentials of these digital opportunities. 
         Our comprehensive enables students to get into jobs as soon as completion of the course. <br />
         This can surely work as a game-changer for
         every student who wishes to make it big with the latest technologies and update themselves for the fast-evolving world.
        </p>
        <div>
        <div className='text-3xl my-2 font-semibold'> 
            What you will learn
        </div>
        <div className=''>
            {[...Array(3)].map((value,index)=>{
                return(
            <div className='flex justify-around'>
            <div className='border text-base p-2 mx-1 my-1'>
            A complete overview of digital marketing and the different tools
            </div>
            <div className='border text-base p-2 mx-1 my-1'>
            A complete overview of digital marketing and the different tools
            </div>
            </div>
        )})}
        </div>
        </div>
        <div>
        <div className='text-3xl my-2 font-semibold'> 
            Skills you will achieve
        </div>
        <div className='w-full h-auto bg-slate-200'>
          {/* {
            [...Array(6)].map((value,i)=>{
              return(
              )
            })
          } */}
              <div className='border p-2 bg-blue-200 flex text-center rounded-xl '>
                trading in different currecy pairs
              </div>   
              <div className='border p-2 bg-blue-200 flex text-center rounded-xl'>
                trading in different currecy pairs
              </div> 
              <div className='border p-2 bg-blue-200 flex text-center rounded-xl'>
                trading in different currecy pairs
              </div>       
              <div className='border p-2 bg-blue-200 flex text-center rounded-xl'>
                trading in different currecy pairs
              </div>   
        </div>
        </div>
      </div>
      <div className='col-span-2 flex justify-center'>
        <div className='w-2/3'>
            <div className='rounded-xl w-full h-48 bg-gray-200 flex justify-center items-center'>
                    Play Video
            </div>
            <div className='text-2xl my-2 mx-2'>
                $500
            </div>
            <div className='flex'>
            <div className='border rounded-lg p-2 bg-blue-600 text-white'>
                Download course syllabus
            </div>
            </div>
            {
              [...Array(6)].map((value,index)=>{
                    return(
                      <div className='w-full flex justify-between px-2 py-2'>
                    <div>Coursemode</div>
                    <div>Online</div>
                    </div>
                    )
                })
            }
            <div className='w-fulll bg-blue-200 h-36'>

            </div>
        </div>
      </div>
    </section>

    <section>
          
    </section>
    </>
  )
}

export default Body
