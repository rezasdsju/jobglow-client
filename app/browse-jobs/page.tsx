import { getJobs } from "@/lib/api/jobs";
import { IJob } from "@/types/jobTypes";


const BrowseJobsPage = async({searchParams}:{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

    const search = await searchParams
    // console.log('search params: ', search)
    const urlSearch = new URLSearchParams(search as Record<string,string>)
    const query = urlSearch.toString()
    // console.log(query)
    const jobs = await getJobs(query)
    return (
        <div>
            <h2>Browse Jobs</h2>
            {
                jobs.map((job:IJob)=><li key={job._id}>{job.title}</li>)
            }
        </div>
    );
};

export default BrowseJobsPage;