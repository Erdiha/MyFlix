import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth, { Iinput } from '../data/data';

const Signin = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [demo, setDemo] = useState(false);
  const { logIn } = useAuth();
  //react hook form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iinput>();
  //when the user clicked button to login, do auth
  const onSubmit: SubmitHandler<Iinput> = async (data) => {
    console.log(data);
    if (demo) {
      data.email = 'demo@demo.com';
      data.password = '123456';
    }

    userLogin && (await logIn(data.email, data.password));
  };

  console.log(demo);
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
        className=" relative flex h-[24rem] w-[16rem] flex-col
                items-center justify-center space-y-[3rem] rounded-2xl 
                bg-black/40 p-[1rem] md:h-[28rem] md:w-[22rem] lg:h-[32rem] lg:w-[26rem]">
        <h1 className=" absolute top-[13%] text-2xl font-bold  text-[#ADDDD0]">
          Sign In
        </h1>
        <div className=" flex h-[50%] w-full flex-col  justify-around md:w-[90%]">
          <input
            {...register('email')}
            required
            className="input"
            type="email"
            placeholder="email"
          />
          <input
            {...register('password')}
            required
            className="input"
            type="password"
            placeholder="Your password"
          />
          <button
            onClick={() => setUserLogin(true)}
            className="md:hover:scale-120 h-[18%] w-[100%] rounded bg-[#ADDDD0] font-semibold"
            type="submit">
            Sign in
          </button>
        </div>
        <span className="absolute bottom-5 m-auto font-semibold text-[#ADDDD090] md:bottom-10 ">
          Need an Account?{' '}
          <Link href="/signup">
            <a className="hover:scale-120 text-1xl pl-2 font-bold text-[#ceeee6] underline  md:text-2xl ">
              {' '}
              Register
            </a>
          </Link>
        </span>
      </form>
      <div className=" items center m-5 flex flex-col items-center justify-center gap-4 text-white">
        {' '}
        <p className="text-[20px]">or</p>
        <form action="" className="z-50" onSubmit={handleSubmit(onSubmit)}>
          <button
            type="submit"
            onClick={() => {
              setDemo(true);
              setUserLogin(true);
            }}
            className=" mt-2 h-10 w-20 cursor-pointer rounded-md bg-black/60 font-semibold">
            Demo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
