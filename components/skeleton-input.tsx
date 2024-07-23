import { Skeleton } from "@/components/ui/skeleton"

function SkeletonInput() {
    return (
        <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-10" />
        </div>


    );
}
export default SkeletonInput;