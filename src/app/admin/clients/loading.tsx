import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
    return (
        <section className="space-y-8">
            <div className="container space-y-3">
                <Skeleton className="w-1/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </div>

            <div className="product__report--container">
                <Skeleton className="product__report--card">
                    <div className="h-[100px] w-2/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="product__report--card">
                    <div className="h-[100px] w-2/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="product__report--card">
                    <div className="h-[100px] w-2/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </div>

            <Skeleton className="container rounded-lg">
                <div className="h-96 rounded-lg bg-default-300"></div>
            </Skeleton>
        </section>
    )
}