import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonList() {
    return (
        <div className="flex-col items-center space-y-4">
            <div className="flex items-center space-x-4 w-full">
                <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <div className="flex items-center space-x-4 w-full">
                <div className="space-y-2 w-1/2">
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2 w-1/2">
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <div className="flex items-center space-x-4 w-full">
                <div className="space-y-2 w-1/2">
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="space-y-2 w-1/2">
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    )
}
