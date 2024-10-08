"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../../style/wrapsol.css";
import { unwrapBnb } from '@/api/binance';


export const UnwrapBnb = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const telegramId = queryParams ? queryParams.get('telegramId') : '';

    const [amount, setAmount] = useState('')

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
   
    const updateConfigHandler = async() => {
        try {
            setIsButtonDisabled(true);

            if(!amount) {
                toast.error("Fill all the input provided", ), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 8000
                };
                setIsButtonDisabled(false);
                return;
            }

            const api = await unwrapBnb(telegramId, parseFloat(amount), )
            const response = await api.json()
            const responseStatus = response.status

            if (!responseStatus) {
                toast.error(response.error[0].message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 8000
                });
                setIsButtonDisabled(false);
                return;
            }
    
            toast.success('Transaction in progress', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            });
            const timer = setTimeout(() => {
                window.close();
            }, 5000); // 5000 milliseconds = 5 seconds
         
            return () => clearTimeout(timer);
        } catch (error) {
            toast.error("Unable to perform transaction.", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            setIsButtonDisabled(false);
            console.log('error', error)
            return
        }
    }

    return(<>
        <section>
            <div id='importAccount' className=''>
                <div id='from-input'>
                   <div>
                        <label htmlFor="">amount</label>
                        <input type="number"  value={amount} onChange={(e) => setAmount(e.target.value)}/>
                   </div>         
                </div>
                <div id='submit-btn'>
                    <button type='button' onClick={updateConfigHandler} disabled={isButtonDisabled}   style={{cursor: isButtonDisabled ? 'not-allowed' : 'pointer'}}>unwrap BNB</button>
                </div>
            </div>
        </section>
    </>)
}