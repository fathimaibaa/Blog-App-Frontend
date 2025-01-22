import React, { useEffect, useState } from 'react'
import MyBlogsCard from '../components/Blog/MyBlogsCard'
import Navbar from '../components/navbar/Navbar'
import useAxios from '../hooks/useAxios'

function MyPosts() {
  const [myposts, setMyposts] = useState(null)
  const { loading, data, error, apiCall } = useAxios()

  useEffect(() => {
    apiCall('/myblogs')
  }, [])

  useEffect(() => {
    if (data) {
      console.log(data)
      setMyposts(data?.post)
    }
  }, [data, error])

  return (
    <>
      <Navbar />
      <div className='mt-[6rem] w-full flex flex-col items-center gap-[2rem]'>
        {/* If there are no posts, show a "No blogs available" message */}
        {myposts && myposts.length === 0 && (
          <p className="text-lg text-gray-500">No blogs available</p>
        )}

        {/* Display posts if they exist */}
        {myposts && myposts.length > 0 && myposts.map((post) => {
          return <MyBlogsCard key={post._id} post={post} setMyposts={setMyposts} myposts={myposts} />
        })}
      </div>
    </>
  )
}

export default MyPosts
