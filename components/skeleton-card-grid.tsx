import { Skeleton } from "@/components/ui/skeleton"

function SkeletonCardGrid() {
    return (
        <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                    <div className="flex flex-col items-center space-y-4 p-4">
                        <div className="w-full flex justify-center">
                            <Skeleton className="rounded-full h-24 w-24" />
                        </div>
                        <div className="flex flex-col space-y-2 w-full">
                            <Skeleton className="h-4 w-3/4 self-center" />
                            <Skeleton className="h-4 w-3/4 self-center" />
                        </div>
                        <div className="flex flex-col space-y-2 w-full">
                            <Skeleton className="h-4 w-5/6 self-center" />
                            <Skeleton className="h-4 w-5/6 self-center" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default SkeletonCardGrid;