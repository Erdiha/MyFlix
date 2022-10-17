import React,{useState} from 'react';
import Image from 'next/image'
import Head from 'next/head'
import Link from "next/link"
import { useForm,SubmitHandler } from 'react-hook-form'
import { IRegister } from '../data/data';
import useAuth from '../data/data';

const Signup = () => {
    const {Register} = useAuth()
    const [userSignUp, setUserSignUp] = useState(false);
     const { register, handleSubmit, watch, formState: { errors } } = useForm<IRegister>();
    const onSubmit: SubmitHandler<IRegister> = async ({email,password,repassword}) =>  {
        if (password !== repassword) {
            alert("Password doesnt match");
        }
        else {
            userSignUp && await Register(email,password)
        }
  }

    return (
      <div className="relative flex h-screen w-screen flex-col  items-center justify-center bg-[rgb(0,0,0,0.6)]">
        <Head>
          <title>MyFlix</title>
        </Head>
        <Image
          className="signin-background"
          layout="fill"
          objectFit="cover"
          src="https://rb.gy/p2hphi"
        />

        <span className="icon"> MyFlix </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" relative flex h-[28rem] w-[17rem]
                flex-col items-center justify-center space-y-[3rem] rounded-2xl
                bg-black/40 p-[1rem] md:h-[30rem] md:w-[22rem] lg:h-[33rem] lg:w-[26rem]">
          <h1 className=" absolute  top-[13%] text-3xl font-bold  text-[#ADDDD0]">
            Register
          </h1>
          <div className=" flex h-[50%] w-full flex-col justify-around gap-2 md:w-[85%]">
            <input
              {...register('email')}
              required
              className="input"
              type="email"
              placeholder="Email"
            />
            <input
              {...register('password')}
              required
              className="input"
              type="password"
              placeholder="Your Password"
            />
            <input
              {...register('repassword')}
              required
              className="input"
              type="password"
              placeholder="Confirm Password"
            />
            <button
              onClick={() => setUserSignUp(true)}
              className="mt-5 h-[15%] w-[100%] rounded bg-[#ADDDD0] font-semibold"
              type="submit">
              Sign up
            </button>
          </div>
          <span className="absolute bottom-5 font-semibold text-[#ADDDD090] md:bottom-10 ">
            Have an Account?{' '}
            <Link href="/signin">
              <a className="hover:scale-120  text-1xl pl-2 font-bold text-[#ADDDD0] underline  md:text-2xl ">
                {' '}
                Sign In
              </a>
            </Link>
          </span>
        </form>
      </div>
    );
};


export default Signup;
