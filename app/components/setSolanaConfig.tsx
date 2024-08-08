"use client"
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import  "../style/updateConfig.css";
import { updateSolanaConfig } from "@/api/wallet";


export const SetSolanaConfig = () => {
    const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    // Get the value of a specific query parameter
    const telegramId = queryParams ? queryParams.get('telegramId') : '';

    const [buyerSlippage, setBuyerSlippage] = useState('')
    const [takeProfit, setTakeProfit] = useState('')
    const [stopLoss, setStopLoss] = useState('')
    const [sellSlippage, setSellSlippage] = useState('')
    const [bagToMoon, setBagToMoon] = useState('')
    const [minLiquidity, setMinLiquidity] = useState('')
    const [maxLiquidity, setMaxLiquidity] = useState('')
    const [qouteAmount, setQouteAmount] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
   
    const updateConfigHandler = async() => {
        try {
            setIsButtonDisabled(true);

            if(!buyerSlippage || !takeProfit || !stopLoss || !sellSlippage || !bagToMoon || !minLiquidity || !maxLiquidity || !qouteAmount) {
                toast.error("Fill all the input provided", ), {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 8000
                };
                setIsButtonDisabled(false);
                return;
            }
            const api = await updateSolanaConfig(telegramId, parseFloat(buyerSlippage), parseFloat(takeProfit), parseFloat(stopLoss), parseFloat(sellSlippage), parseFloat(bagToMoon), parseFloat(minLiquidity), parseFloat(maxLiquidity), parseFloat(qouteAmount))
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
                        <label htmlFor="">Buyer slippage</label>
                        <input type="number"  value={buyerSlippage} onChange={(e) => setBuyerSlippage(e.target.value)}/>
                   </div>
                   <div>
                        <label htmlFor="">Take profit</label>
                        <input type="number"  value={takeProfit} onChange={(e) => setTakeProfit(e.target.value)}/>
                   </div>               
                </div>
                <div id='from-input'>
                   <div>
                        <label htmlFor="">Stop loss</label>
                        <input type="number" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)}/>
                   </div>
                   <div>
                        <label htmlFor="">Sell silippage</label>
                        <input type="number"  value={sellSlippage} onChange={(e) => setSellSlippage(e.target.value)}/>
                   </div>   
                </div>
                <div id='from-input'>
                   <div>
                        <label htmlFor="">Min liquidity</label>
                        <input type="number"  value={minLiquidity} onChange={(e) => setMinLiquidity(e.target.value)}/>
                   </div>
                   <div>
                        <label htmlFor="">Max liquidity</label>
                        <input type="number"  value={maxLiquidity} onChange={(e) => setMaxLiquidity(e.target.value)}/>
                   </div>
                </div>
                <div id='from-input'>
                   <div>
                        <label htmlFor="">Bag to moon</label>
                        <input type="number"  value={bagToMoon} onChange={(e) => setBagToMoon(e.target.value)}/>
                   </div>
                   <div>
                        <label htmlFor="">Qoute amount</label>
                        <input type="number"  value={qouteAmount} onChange={(e) => setQouteAmount(e.target.value)}/>
                   </div>
                </div>
                <div id='submit-btn'>
                    <button type='button' onClick={updateConfigHandler} disabled={isButtonDisabled}   style={{cursor: isButtonDisabled ? 'not-allowed' : 'pointer'}}>update</button>
                </div>
            </div>
        </section>
    </>)
}