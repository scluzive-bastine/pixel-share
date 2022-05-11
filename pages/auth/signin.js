import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import bg from '../../images/lgbg.png'
import { FcGoogle } from 'react-icons/fc'

const Login = ({ providers }) => {
  return (
    <div className="flex ">
      <div className="relative hidden h-[100vh] md:flex md:w-2/3">
        <div
          className="absolute z-10 h-full w-full"
          style={{ background: '#0009' }}
        ></div>
        <Image src={bg} layout="fill" objectFit="cover" />
      </div>
      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-gray-100 md:w-1/3">
        <div className="absolute z-10 h-full w-full bg-gray-100 md:hidden">
          <Image src={bg} layout="fill" objectFit="cover" />
        </div>
        {/* center a div */}
        <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 md:px-2 lg:px-10">
          <div className="w-full rounded-lg border border-gray-200 bg-white py-5 px-3 md:px-2 lg:px-10">
            <div className="text-center">Login with</div>
            {Object.values(providers).map((provider) => (
              <div className="mt-4 flex justify-center" key={provider.name}>
                <div
                  className="flex h-[50px] w-[300px] cursor-pointer items-center justify-center rounded-lg border border-gray-200 transition duration-150 ease-in-out hover:shadow-lg md:w-[250px]"
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                >
                  <div className="flex items-center">
                    <FcGoogle className="text-3xl" />
                    <div className="ml-2 border-l border-gray-200 pl-2">
                      Sign with {provider.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

export const getServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}
