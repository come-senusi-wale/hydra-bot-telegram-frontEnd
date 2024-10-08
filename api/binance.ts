// import { axiosInstance } from "./axios"

// export const baseUrl = 'http://localhost:8081/api/v1'
// export const baseUrl = 'https://snipper-bot-ancient-dew-8766-dawn-cloud-8655.fly.dev/api/v1'
// export const baseUrl = 'https://consumer-snipper-bot.fly.dev/api/v1'
import { baseUrl } from "@/api/baseurl";

// export const createWallet = (body: any) => {
//     return axiosInstance().post("/create_account", body);
// }

export const getAccountBinanceNativeTokenBalance = async(telegramId: any,) => {
    const response = await fetch(`${baseUrl}/binance/balance?telegramId=${telegramId}`, {
        // method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        // body: JSON.stringify(body),
    });

    return response
}

export const transferBinanceNaveToken = async(telegramId: any, recipientAddress: string, amount: number) => {
    const response = await fetch(`${baseUrl}/binance/transfer/native/token`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify({
            telegramId,
            recipientAddress,
            amount
        }),
    });

    return response
}


export const getAccountBinanceTokenBalance = async(telegramId: any, mintAdress: any) => {
    const response = await fetch(`${baseUrl}/binance/token/balance?telegramId=${telegramId}&mintAdress=${mintAdress}`, {
        // method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        // body: JSON.stringify(body),
    });

    return response
}

export const transferBinanceToken = async(telegramId: any,mintAdress: any, recipientAddress: string, amount: number) => {
    const response = await fetch(`${baseUrl}/binance/transfer/token`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify({
            telegramId,
            mintAdress,
            recipientAddress,
            amount
        }),
    });

    return response
}

export const updateSolanaConfig = async(telegramId: any, buyerSlippage: number, takeProfit: number, stopLoss: number, sellSlippage: number, bagToMoon: number, minLiquidity: number, maxLiquidity: number, qouteAmount: number) => {
    const response = await fetch(`${baseUrl}/binance/update/config`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify({
            telegramId,
            buyerSlippage,
            takeProfit,
            stopLoss,
            sellSlippage,
            bagToMoon,
            minLiquidity,
            maxLiquidity,
            qouteAmount
        }),
    });

    return response
}

export const wrapBnb = async(telegramId: any, amount: number) => {
    const response = await fetch(`${baseUrl}/binance/wrap/bnb`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify({
            telegramId,
            amount,  
        }),
    });

    return response
}

export const unwrapBnb = async(telegramId: any, amount: number) => {
    const response = await fetch(`${baseUrl}/binance/unwrap/bnb`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        body: JSON.stringify({
            telegramId,
            amount,  
        }),
    });

    return response
}
