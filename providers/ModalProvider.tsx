"use client"

import AuthModal from '@components/AuthModal';
import Modal from '@components/Modal';
import React, { useEffect, useState } from 'react'

type Props = {}

const ModalProvider = (props: Props) => {
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
    </>
  )
}

export default ModalProvider