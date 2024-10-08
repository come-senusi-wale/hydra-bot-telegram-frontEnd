"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../../style/sendsolanaToken.css";
import { getAccountBinanceNativeTokenBalance, transferBinanceNaveToken } from '@/api/binance';


export const SendNativeToken = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const telegramId = queryParams ? queryParams.get('telegramId') : '';
    const accountId = queryParams ? queryParams.get('account') : '';

    const [fromAccount, setFromAccount] = useState('')
    const [toAccount, setToAccount] = useState('')
    const [amount, setAmount] = useState('')

    const [showToAccountErr, setShowToAccountErr] = useState(false)
    const [accountCurrect, setAccountCurrect] = useState(false)

    const[tokenBalance, setTokenBalance] = useState(0)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const [amoutError, setAmoutError] = useState(false)

    const toAccountInputHandler = async (e: any) => {
        if(!toAccount) {
            setAccountCurrect(false)
            return
        }

        setAccountCurrect(true)
        setShowToAccountErr(false)
    }

    const amoutInputHandler = async (e: any) => {
        if(!amount) {
            setAmoutError(false)
            return;
        }

        if (parseFloat(amount) > tokenBalance) {
            setAmoutError(true)
            return;
        }

        setAmoutError(false)
    }

    const trnasferTokenHandler = async() => {
        try {       
            setIsButtonDisabled(true);
            if(!toAccount) {
                toast.error("Provide reciever account", ), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 8000
                };
                setIsButtonDisabled(false);
                return;
            }

            if(!amount) {
                toast.error("Provide amount", ), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 8000
                };
                setIsButtonDisabled(false);
                return;
            }

            if (showToAccountErr) {
                toast.error("Provide valid reciever account", ), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 8000
                };
                setIsButtonDisabled(false);
                return;
            }

            if (parseFloat(amount) > tokenBalance) {
                toast.error("Your balance is low", ), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 8000
                };
                setIsButtonDisabled(false);
                return;
            }

            const api = await transferBinanceNaveToken(telegramId, toAccount, parseFloat(amount))

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
            return;
        } catch (error) {
            toast.error("Unable to perform transaction.", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            setIsButtonDisabled(false);
            console.log('Error', error)
            return
        }
    }

    useEffect( () =>{
        setFromAccount(accountId!)
    }, [])

    useEffect( () => {
        const getBalance = async() => {
            const getTokenBalance = await getAccountBinanceNativeTokenBalance(telegramId)
            const response = await getTokenBalance.json()
            console.log('me', response)
            setTokenBalance(parseFloat(response.data.largeUnit))
        }

        getBalance()
    }, [])


    return(<>
        <section>
            <div id='importAccount' className=''>
                <div id='from-input'>
                    <label htmlFor="">From</label>
                    <input type="text"  value={fromAccount} readOnly/>
                </div>
                <div id='to-input'>
                    <label htmlFor="">To</label>
                    <input className={`${accountCurrect? showToAccountErr? 'outline-none border-b-2 border-red-500 text-red-500' : 'outline-none border-b-2 border-blue-500 text-blue-500' : ''}`} type="text" placeholder='account ID' value={toAccount} onChange={(e) => setToAccount(e.target.value)} onKeyUp={toAccountInputHandler}/>
                    {accountCurrect? 
                        showToAccountErr? 
                            <p className='text-red-600'>invalid account</p> : 
                            ''
                        : 
                    ''}
                </div>
                <div id='amount-input'>
                    <label htmlFor="">Amount</label>
                    <input type="number" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} onKeyUp={amoutInputHandler}/>
                    {amoutError? <p className='text-red-600'>insufficient balance</p> : ''}
                </div>
                <div id='asset'>
                    <div id='near'>
                        <div id='near-img'>
                        {/* <Image src={nearLogo} alt="" className='img'/> */}
                        </div>
                        <h2>Binance</h2>
                    </div>
                    <p>{tokenBalance.toFixed(4)} BNB</p>
                </div>
                <div id='submit-btn'>
                    <button type='button' onClick={trnasferTokenHandler} disabled={isButtonDisabled} style={{cursor: isButtonDisabled ? 'not-allowed' : 'pointer'}}>Send</button>
                </div>
            </div>
        </section>
    </>)
}