import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { FiUploadCloud } from 'react-icons/fi'
import { BsCheck, BsImage } from 'react-icons/bs'
import { BiError } from 'react-icons/bi'
import { FaTimes } from 'react-icons/fa'

import { client } from '../sanity'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { usePixelContext } from '../context/context'
import { fetchCategories } from '../utils/useFetch'

import Loader from '../components/Loader'
import Success from '../components/alerts/Success'
import Error from '../components/alerts/Error'


interface IPost {
  name: string
  description: string
  category: string
}

interface ICategory {
  _id: string
  name: string
}

interface ISession {
  token: string
}

const Create = () => {
  const { getCategories, categories } = usePixelContext()
  
  const [post, setPost] = useState<IPost>({
    name: '',
    description: '',
    category: ''
  })

  const [imageAsset, setImageAsset] = useState<any>()
  const [imageName, setImageName] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)
  const [wrondImageType, setWrondImageType] = useState(false)
  const [loading, setLoading] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const [error, setError] = useState(false)


  const { data: session } = useSession<any>()
  
    const uploadImage = async (e: any) => {
    const { type, name } = e.target.files[0]
    if (
      type === 'image/jpeg' ||
      type === 'image/png' ||
      type === 'image/jpg' ||
      type === 'image/gif' ||
      type === 'image/webp' ||
      type === 'image/svg+xml'
    ) {
      setWrondImageType(false)
      setLoading(true)  
      
      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name })
        .then((document) => {
          setImageAsset(document)
          setImageName(name)
          setLoading(false)
        })
        .catch((error) => {
          console.log('image upload error', error)
        })

    } else {
      setWrondImageType(true)
    }
  }
  

  const postDetails = {
    name: post.name,
    description: post.description,
    category: post.category,
    image: imageAsset,
    user: session?.session.token
  }

  const savePost = async () => {  
    setSavingPost(true)
    if (post.name && post.description && post.category && imageAsset) {
      await fetch('/api/create-post', {
        method: 'POST',
        body: JSON.stringify(postDetails),
      }).then(res => {
        setSavingPost(false)
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 10000)
        setPost({
          name: '',
          description: '',
          category: ''
        })
        setImageAsset(null)
      }).catch(err => {
        console.log(err);
      })
    } else {
      setSavingPost(false)
      setError(true)
      setTimeout(() => setError(false), 10000)
    }

  }

  useEffect(() => {
    fetchCategories(getCategories)    
  }, [])



  return (
    <div>
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500">
        <Header />
      </header>
      <main className="relative container px-4">
        <div className="mt-10 h-[200px] w-full">
          <div className="h-full w-full rounded bg-gray-100 p-3">
            <div className="relative h-full w-full rounded border-2 border-dashed border-gray-300">
              {wrondImageType && (
                <div className="text-center text-red-600 py-2 uppercase text-sm">Wrong image type</div>
              )}
              {
                loading ? <div className='h-full flex items-center justify-center'><Loader /> </div>
                  : <>
                    {!imageAsset ? (
                      <label className='h-full flex flex-col items-center justify-center'>
                        <div className="cursor-pointer">
                          <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold">
                              <FiUploadCloud />
                            </p>
                            <p className="text-lg">Click to upload</p>
                          </div>
                          <p className="mt-4 text-sm text-gray-400">
                            Use high quality JPG, SVG, GIF less than 20 MB
                          </p>
                        </div>
                        <input
                          type="file"
                          name="upload-iamge"
                          onChange={uploadImage}
                          className="h-0 w-0"
                        />
                      </label>
                    ) : (
                      <div className='h-full'>
                        <div className="items-center justify-center h-full hidden md:flex">
                          <div className='flex flex-col items-center justify-center'>
                            <BsCheck className='text-3xl text-green-700 text-center' />
                            <p className="text-lg text-center">{imageName}</p>
                            <div className='text-red-500 cursor-pointer text-sm mt-2 hover:underline' onClick={() => setImageAsset(null)}>Remove image</div>
                          </div>
                        </div>
                        <div className=' p-2 bg-gray-100 block md:hidden'>
                            <Image src={imageAsset?.url} layout="fill" objectFit="cover" className='rounded' />
                            <div className="absolute top-6 right-4 h-6 w-6 cursor-pointer items-center justify-center rounded bg-gray-50 p-2 text-2xl font-medium flex text-red-600 transition duration-150 ease-in-out" onClick={() => setImageAsset(null)}>
                              <FaTimes />
                            </div>
                        </div>
                      </div>
                    )}
                  </>
              }
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 space-x-5 md:grid-cols-2">
          {/* <form> */}
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col">
              <input type="hidden" />
              <label htmlFor="name" className="text-gray-600">
                Post Name
              </label>
              <input
                type="text"
                className="input"
                id="name"
                  placeholder="My office view"
                  value={post.name}
                  onChange={(e) => setPost({...post, name: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="text-gray-600">
                Post Name
              </label>
              <select
                  className="w-full rounded-md border-gray-200 bg-gray-100 p-3 text-sm outline-none"
                  id="category"
                  value={post.category}
                  onChange={(e) => setPost({...post, category: e.target.value})}
              >
                <option value="">Select category</option>
                {categories.map((category: ICategory) => (
                  <option value={category._id} key={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="description" className="text-gray-600">
                Post Description
              </label>
                <textarea id="description" className="input"
                  value={post.description}
                  onChange={(e) => setPost({...post, description: e.target.value})}
                ></textarea>
              </div>
            <button className='bg-green-600 text-white px-2 py-2 rounded w-[150px] uppercase text-sm' onClick={savePost} disabled={savingPost}>{  savingPost ? 'saving...' : "Submit" }</button>
          </div>
          {/* </form> */}
          <div className="hidden md:inline">
            <div className='flex justify-between items-center border-b border-gray-200 pb-2'>
              <div className='uppercase text-xs'>Selected Image</div>
              {imageAsset && (
                <div className="flex items-center text-sm bg-red-50 px-2 py-1 cursor-pointer hover:bg-red-100 transition duration-150 ease-in-out" onClick={() => setImageAsset(null)}>
                      Remove
                      <FaTimes className='h-3 w-3' />
                </div>
              )}
            </div>

            {
              loading ? <Loader />
                : <>
                  {
                    !imageAsset ? (
                      <div className="relative mt-2 flex h-[300px] w-full flex-col items-center justify-center rounded bg-gray-100 p-2">
                        <>
                          <BsImage className="text-2xl text-gray-600" />
                          <div className=" text-sm text-gray-600">No Image yet</div>
                        </>
                      </div>
                    ): (
                      <div className='h-[400px] w-full p-2 relative mt-3'>
                        <Image src={imageAsset?.url} layout="fill" objectFit="contain" className='rounded-xl' />
                      </div>
                    )
                  }
                </>
            }
          </div>
        </div>
      </main>
      { error && <Error /> }
      { submitted && <Success />}
    </div>
  )
}

export default Create
