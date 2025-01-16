"use client";

import React, { useEffect } from 'react'
import { decodeToken } from "@/utils";
import { useDispatch, } from 'react-redux';
import { restartUserInfos } from '@/store/slices/auth';


const CheckToken = () => {
    const dispatch = useDispatch();

  useEffect(() => {
      if (typeof window !== 'undefined') {
          const token = localStorage.getItem('userToken');
          if (token) {
              const userInfos =  decodeToken(token);
              dispatch(restartUserInfos(userInfos));
          }
      }
  }, [dispatch]);
  return (
    <></>
  )
}

export default CheckToken