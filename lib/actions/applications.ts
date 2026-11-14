import { IApplication } from "@/types/applicationTypes"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL


export const applyToJob = async (data:IApplication) => {
    const response = await fetch(`${BASE_URL}/applications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
    return response.json()
}