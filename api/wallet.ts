// import { axiosInstance } from "./axios"

// export const baseUrl = 'http://localhost:8081/api/v1'
// export const baseUrl = 'https://snipper-bot-ancient-dew-8766-dawn-cloud-8655.fly.dev/api/v1'
export const baseUrl = 'https://consumer-snipper-bot.fly.dev/api/v1'

// export const createWallet = (body: any) => {
//     return axiosInstance().post("/create_account", body);
// }


export const getAccountTokenBalance = async(telegramId: any, mintAdress: any) => {
    const response = await fetch(`${baseUrl}/solana/token/balance?telegramId=${telegramId}&mintAdress=${mintAdress}`, {
        // method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
        },
        // body: JSON.stringify(body),
    });

    return response
}

export const transferToken = async(telegramId: any,mintAdress: any, recipientAddress: string, amount: number) => {
    const response = await fetch(`${baseUrl}/solana/transfer/token`, {
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
    const response = await fetch(`${baseUrl}/solana/update/config`, {
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
