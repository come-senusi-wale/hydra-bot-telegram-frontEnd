"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../style/sendsolanaToken.css";
import {getAccountTokenBalance, transferToken } from "@/api/wallet";


export const SendSolanaToken = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const telegramId = queryParams ? queryParams.get('telegramId') : '';
    const accountId = queryParams ? queryParams.get('account') : '';
    const mintAdress =  queryParams ? queryParams.get('mintAdress') : '';

    const [fromAccount, setFromAccount] = useState('')
    const [toAccount, setToAccount] = useState('')
    const [amount, setAmount] = useState('')

    const [showToAccountErr, setShowToAccountErr] = useState(false)
    const [accountCurrect, setAccountCurrect] = useState(false)

    const[tokenName, setTokenName] = useState('')
    const[tokenBalance, setTokenBalance] = useState(0)
    const[tokenDecimal, setTokenDEcimal] = useState(9)

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
        if(!toAccount) {
            toast.error("provide reciever account", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        if(!amount) {
            toast.error("provide amount", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        if (showToAccountErr) {
            toast.error("provide valid reciever account", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        if (parseFloat(amount) > tokenBalance) {
            toast.error("your balance is low", ), {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            };
            return;
        }

        const api = await transferToken(telegramId, mintAdress, toAccount, parseFloat(amount))

        const response = await api.json()
        const responseStatus = response.status

        if (!responseStatus) {
            toast.error(response.error[0].message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000
            });
            return;
        }

        toast.success('Transaction in progress', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 8000
        });
        return;
    }

    useEffect( () =>{
        setFromAccount(accountId!)
    }, [])

    useEffect( () => {
        const getBalance = async() => {
            const getTokenBalance = await getAccountTokenBalance(telegramId, mintAdress)
            const response = await getTokenBalance.json()
            setTokenBalance(parseFloat(response.data.tokenBalance.balance) / 10**response.data.token.decimal)
            setTokenName(response.data.token.symbol)
            setTokenDEcimal(response.data.token.decimal)
        }

        getBalance()
    }, [])


    return(<>
        <section>
            <div id='importAccount' className=''>
                <div id='from-input'>
                    <label htmlFor="">from</label>
                    <input type="text"  value={fromAccount} readOnly/>
                </div>
                <div id='to-input'>
                    <label htmlFor="">to</label>
                    <input className={`${accountCurrect? showToAccountErr? 'outline-none border-b-2 border-red-500 text-red-500' : 'outline-none border-b-2 border-blue-500 text-blue-500' : ''}`} type="text" placeholder='account ID' value={toAccount} onChange={(e) => setToAccount(e.target.value)} onKeyUp={toAccountInputHandler}/>
                    {accountCurrect? 
                        showToAccountErr? 
                            <p className='text-red-600'>invalid account</p> : 
                            ''
                        : 
                    ''}
                </div>
                <div id='amount-input'>
                    <label htmlFor="">amount</label>
                    <input type="number" placeholder='near token' value={amount} onChange={(e) => setAmount(e.target.value)} onKeyUp={amoutInputHandler}/>
                    {amoutError? <p className='text-red-600'>insufficient balance</p> : ''}
                </div>
                <div id='asset'>
                    <div id='near'>
                        <div id='near-img'>
                        {/* <Image src={nearLogo} alt="" className='img'/> */}
                        </div>
                        <h2>{tokenName}</h2>
                    </div>
                    <p>{tokenBalance}</p>
                </div>
                <div id='submit-btn'>
                    <button type='button' onClick={trnasferTokenHandler}>send</button>
                </div>
            </div>
        </section>
    </>)
}