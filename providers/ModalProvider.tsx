"use client"

import React, { useEffect, useState } from 'react'

import AuthModal from '@components/AuthModal';
import UploadModal from '@components/UploadModal';

const ModalProvider = () => {
    const[isMounted, setIsMounted] = useState(false);

    //This is to make sure that the modals dont render during ssr (it can cause hydration errors)
    useEffect(() => {
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }


  return (
    <>
        <AuthModal />
        <UploadModal />
    </>
  )
}

export default ModalProvider