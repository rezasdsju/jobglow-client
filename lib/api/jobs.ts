const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const getJobs = async(query="")=>{
    const res = await fetch(`${BASE_URL}/jobs?${query}`)
    return res.json()
}