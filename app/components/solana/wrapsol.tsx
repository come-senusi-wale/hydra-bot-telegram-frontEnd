"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../../style/wrapsol.css";
import { wrapSol } from "@/api/solana";


export const WrapSol = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const telegramId = queryParams ? queryParams.get('telegramId') : '';

    const [amount, setAmount] = useState('')

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
   
    const updateConfigHandler = async() => {
        try {
            setIsButtonDisabled(true);
            console.log(1)

            if(!amount) {
                toast.error("Fill all the input provided", ), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 8000
                };
                setIsButtonDisabled(false);
                return;
            }

            console.log(2)
            const api = await wrapSol(telegramId, parseFloat(amount), )
            console.log(3)
            const response = await api.json()
            const responseStatus = response.status

            console.log(4)

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
                    <button type='button' onClick={updateConfigHandler} disabled={isButtonDisabled}   style={{cursor: isButtonDisabled ? 'not-allowed' : 'pointer'}}>wrap</button>
                </div>
            </div>
        </section>
    </>)
}