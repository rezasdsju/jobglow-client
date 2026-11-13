const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const getJobs = async()=>{
    const res = await fetch(`${BASE_URL}/jobs`)
    return res.json()
}