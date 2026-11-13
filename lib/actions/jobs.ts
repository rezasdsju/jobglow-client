import { IJob } from "@/types/jobTypes";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const createJob = async (data: IJob) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json()
}


export const deleteJob = async(jobId:string)=>{
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
        method: 'DELETE'
    })
    return res.json()
}