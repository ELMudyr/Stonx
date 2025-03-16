import React from "react"
import { Skeleton } from "./skeleton"

const CardSkeleton = () => {
  return (
    <div className="flex items-center bg-card border shadow rounded-xl px-6 py-4 h-28 justify-between  ">
      <div className="space-y-2">
        <Skeleton className="h-5 w-[150px]" />
        <Skeleton className="h-5 w-[230px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-[100px]" />
        <Skeleton className="h-5 ml-auto w-[50px]" />
      </div>
    </div>
  )
}
export default CardSkeleton
