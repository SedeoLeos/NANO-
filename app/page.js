"use client";

import Task from "@/components/Task";
import { restartMessageValue } from "@/store/slices/task";
import { AddTaskThunk, GetTaskThunk } from "@/store/thunks/task";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { BounceLoader } from 'react-spinners';



export default function Home() {


  const [form,setForm]= useState({
    title:'',
    description:''
  });

  const dispatch=useDispatch();

  const {loading,errorMessage,successMessage}=useSelector((state)=>state.task);

  const {userInfos}=useSelector((state)=>state.auth);

  const {tasks}=useSelector((state)=>state.task);

  const handleInput=(e)=>{

    setForm({...form,[e.target.name]:e.target.value});

  }

  const addTask=(event)=>{

    event.preventDefault();


    dispatch(AddTaskThunk({title:form.title,description:form.description,userId:userInfos.userId }));

  }

  useEffect(()=>{

    if(successMessage){
        toast.success(successMessage);

        dispatch(restartMessageValue());

        
    }

    if(errorMessage){
        toast.error(errorMessage);
        
        dispatch(restartMessageValue());

    }
    

},[errorMessage,successMessage])



 useEffect(()=>{

  console.log('On recupere les taches',userInfos?.userId);

  if(userInfos){
    
    dispatch(GetTaskThunk(userInfos?.userId));
  }
  
 },[userInfos])


  return (
    <div className="w-full flex h-[100vh]">
        
        <div className="w-[40%] bg-[#0C514C] flex flex-col justify-center px-8">

          <div className="bg-[#F7F7F5] px-8 py-10 rounded-md">
              <h1 className="text-center text-[#181D27]" style={{fontSize:'25px'}}>Nouvelle tache</h1>
              <form className='mt-4' onSubmit={addTask}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="title" className="text-[#717680]">
                          Titre <span className="text-[#17655B]">*</span>
                        </label>
                        <input type="text" name='title' id='title' className='bg-white border border-[#D5D7DA] rounded-md py-[10px] px-[16px] text-gray-400' placeholder='Titre' onChange={handleInput} required />
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label htmlFor="description" className="text-[#717680]">
                        Description <span className="text-[#17655B]">*</span>
                        </label>
                        <input type="text" name='description' id='description' className='bg-white border border-[#D5D7DA] rounded-md py-[10px] px-[16px] text-gray-400' placeholder='Decription' onChange={handleInput}  required />
                    </div>
                    <div className='mt-4'>

                      {
                        loading ?  <div className="flex justify-center w-full">
                              <BounceLoader color='#525ce5'/>
                           </div>: <button className='w-full rounded-md text-white bg-[#17655B] py-[10px] px-[16px]'>Ajouter</button>
                      }
                        
                    </div>
                </form>
          </div>
          
        </div>
        <div className="w-[60%] bg-[#F7F7F5] px-10 py-10 overflow-y-auto">
           <h1 className="font-bold text-[#181D27]" style={{fontSize:"30px"}}>Liste de taches (<span>16</span>)</h1>
           <p className="mt-4 text-[#535862]" style={{fontSize:"16px"}}>Choisissez le secteur auquel appartient votre entreprise. Cette personnalisation nous aide à vous offrir une expérience sur mesure et pertinente.</p>
           <div className="mt-4 flex flex-wrap justify-between gap-y-4">
              {tasks.length  > 0 ?  tasks.map((el,index)=> <Task />) : <div className="mt-4"> 
                  <h2 className="text-center text-red-400"> 
                    Aucune tache
                  </h2>
                </div>}
           </div>
        </div>
      
    </div>
  );
}
