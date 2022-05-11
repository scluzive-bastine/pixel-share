import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { BsTwitter } from 'react-icons/bs'
import { client } from '../sanity'
import Success from './alerts/Success'

const MyModal = ({ isOpen, handleClose, user }) => {
  const { instagram, twitter, _id } = user
  const [bio, setBio] = useState(user.bio || '')
  const [country, setCountry] = useState(user.location || '')
  const [socialAccounts, setSocialAccounts] = useState({
    instagram: instagram || '',
    twitter: twitter || '',
  })
  const [success, setSuccess] = useState(false)

  const handleSubmitBio = () => {
    if (bio) {
      client
        .patch(_id)
        .set({ bio: bio })
        .commit()
        .then((res) => {
          console.log(res)
          setBio('')
          handleClose()
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const handleSubmitCountry = () => {
    if (country) {
      client
        .patch(_id)
        .set({ location: country })
        .commit()
        .then((res) => {
          console.log(res)
          setCountry('')
          handleClose()
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const handleSubmitSocials = () => {
    if (socialAccounts.instagram || socialAccounts.twitter) {
      client
        .patch(_id)
        .set({
          instagram: socialAccounts.instagram,
          twitter: socialAccounts.twitter,
        })
        .commit()
        .then((res) => {
          console.log(res)
          handleClose()
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      {!user ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Settings
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="mt-4 flex flex-col">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                          name="bio"
                          id="bio"
                          cols="30"
                          rows="3"
                          className="input"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Enter your bio..."
                        ></textarea>
                      </div>
                      <button
                        className="mt-2 rounded bg-teal-600 px-4 py-2 font-semibold text-white transition duration-150 ease-in-out hover:bg-teal-700 disabled:bg-gray-200"
                        onClick={handleSubmitBio}
                        disabled={!bio}
                      >
                        Save Changes
                      </button>
                    </div>
                    <div className="mt-5 border-t border-gray-300 pt-5">
                      <div className="w-full">
                        <label htmlFor="location">Country</label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="input w-full"
                            placeholder="Enter your country..."
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                        <button
                          className="mt-2 rounded bg-teal-600 px-4 py-2 font-semibold text-white transition duration-150 ease-in-out hover:bg-teal-700 disabled:bg-gray-200"
                          onClick={handleSubmitCountry}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                    <div className="mt-5 border-t border-gray-300 pt-5">
                      <h1 className="text-lg text-black">Social Links </h1>
                      <div className="mt-4 w-full">
                        <label
                          htmlFor="instagram"
                          className="font-semibold text-black"
                        >
                          Instagram
                        </label>
                        <div className="mt-1 flex items-center space-x-2 rounded border border-gray-200 bg-gray-100 px-2 md:py-2">
                          <AiFillInstagram className="text-3xl text-gray-600" />
                          <input
                            type="text"
                            name="instagram"
                            id="instagram"
                            value={socialAccounts.instagram}
                            onChange={(e) =>
                              setSocialAccounts({
                                ...socialAccounts,
                                instagram: e.target.value,
                              })
                            }
                            className="w-full flex-grow bg-transparent py-1 text-sm font-semibold text-gray-600 outline-none "
                          />
                        </div>
                      </div>
                      <div className="mt-4 w-full">
                        <label
                          htmlFor="instagram"
                          className="font-semibold text-black"
                        >
                          Twitter
                        </label>
                        <div className="mt-1 flex items-center space-x-2 rounded border border-gray-200 bg-gray-100 px-2 md:py-2">
                          <BsTwitter className="text-2xl text-gray-600" />
                          <input
                            type="text"
                            name="instagram"
                            id="instagram"
                            value={socialAccounts.twitter}
                            onChange={(e) =>
                              setSocialAccounts({
                                ...socialAccounts,
                                twitter: e.target.value,
                              })
                            }
                            className="w-full flex-grow bg-transparent py-1 text-sm font-semibold text-gray-600 outline-none "
                          />
                        </div>
                      </div>
                      <button
                        className="mt-2 rounded bg-teal-600 px-4 py-2 font-semibold text-white transition duration-150 ease-in-out hover:bg-teal-700 disabled:bg-gray-200"
                        disabled={
                          !socialAccounts.instagram && !socialAccounts.twitter
                        }
                        onClick={handleSubmitSocials}
                      >
                        Save Changes
                      </button>
                    </div>
                    {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleClose()}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
      {success && <Success message="Bio updated successfully!" />}
    </>
  )
}

export default MyModal
