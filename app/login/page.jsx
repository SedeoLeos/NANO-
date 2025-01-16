"use client";

import { LoginThunk } from '@/store/thunks/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { restartMessageValue } from '@/store/slices/auth';
import { useRouter } from 'next/navigation';



const page = () => {

    const {loader,errorMessage,successMessage,userInfos}= useSelector((state)=>state.auth);

    const dispatch=useDispatch();

    const router= useRouter();

    const [form,setForm]= useState({
        email:'',
        password:'',
    });

    const login=(event)=>{
        event.preventDefault();

        dispatch(LoginThunk(form));

    }

    const handleInput=(e)=>{

        setForm({...form,[e.target.name]:e.target.value});
    }



    useEffect(()=>{

        if(successMessage){
            toast.success(successMessage);

            dispatch(restartMessageValue());

            router.push('/');
            //naviguer vers la page d'acceuil
        }

        if(errorMessage){
            toast.error(errorMessage);
            
            dispatch(restartMessageValue());

        }

        console.log('valeur de user info',userInfos);
        if(userInfos){
            router.push('/');
        }

    },[errorMessage,successMessage])


  return (
    <div className='bg-[#003D3D] py-20'>

        <div className='flex flex-col justify-center items-center'>
            <div className='w-[564px] rounded-3xl bg-[#F7F7F5] py-[80px] px-[80px]'>

                <h1 className='text-center text-[#181D27]' style={{fontWeight:'600',fontSize:'30px'}}>Se connecter</h1>   
                <form className='mt-4' onSubmit={login}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className="text-[#717680]">
                            Email
                        </label>
                        <input type="email" name='email' id='email' className='bg-white border border-[#D5D7DA] rounded-md py-[10px] px-[16px] text-gray-400' placeholder='Entrer votre adresse email'  required onChange={handleInput} />
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label htmlFor="password" className="text-[#717680]">
                            Password
                        </label>
                        <input type="password" name='password' id='password' className='bg-white border border-[#D5D7DA] rounded-md py-[10px] px-[16px] text-gray-400 ' placeholder='Entrer votre mot de passe' required onChange={handleInput} />
                    </div>
                    <div className='mt-4'>
                    {loader ? <div className='flex justify-center'><BounceLoader color='#525ce5'/></div>: <button className='w-full rounded-md text-white bg-[#17655B] py-[10px] px-[16px]'>Login</button>}
                        
                    </div>
                </form>
            </div>
        </div>
        

        <div className='mt-6 px-8'>
            <h4 className='text-white text-start' style={{fontSize:"14px"}}>© Nanocreatives</h4>
        </div>
    </div>
  )
}

export default page