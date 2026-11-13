'use client'
import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { IJob } from "@/types/jobTypes"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function DeleteJobDialog({ job }: { job: IJob }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const handleDelete = async () => {
        // console.log(job._id)
        if (!job._id) return
        const res = await deleteJob(job._id)
        // console.log(res)
        if (res.deletedCount){
            setOpen(false)
            toast.success('This job has been deleted successfully!')
            router.refresh()
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button variant="destructive">
                        <Trash2Icon />
                    </Button>
                }
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this Job
                        {/* <a href="#">Settings</a> delete any memories saved during this chat. */}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
