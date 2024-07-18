import { Skeleton } from "@/components/ui/skeleton"

function SkeletonCardGridSimple() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                    <div className="flex flex-col items-center space-y-4 p-4">
             
                        <div className="flex flex-col space-y-2 w-full">
                            <Skeleton className="h-4 w-5/6 " />
                            <Skeleton className="h-4 w-3/6 " />
                            <Skeleton className="h-4 w-4/6 " />
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default SkeletonCardGridSimple;