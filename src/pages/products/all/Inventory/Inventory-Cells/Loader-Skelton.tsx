import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function LoaderSkelton() {
  return (
    <div className="flex flex-col w-full border p-3 rounded-sm">
         <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.5 }}
      className="flex items-center space-x-4 py-2 "
    >
      <Skeleton className="h-8 w-8 "  />
      <Skeleton className="h-7 flex-1" />
      <Skeleton className="h-7 flex-1" />
      <Skeleton className="h-7 flex-1" />
      <Skeleton className="h-7 flex-1" />
      <Skeleton className="h-7 flex-1" />
      <Skeleton className="h-7 flex-1" />
      <Skeleton className="h-7 flex-1" />
    </motion.div>
    <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.5 }}
      className="flex items-center space-x-4 py-2 w-full "
    >
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-12 flex-1" />
      <Skeleton className="h-12 flex-1" />
      <Skeleton className="h-12 flex-1" />
      <Skeleton className="h-12 flex-1" />
      <Skeleton className="h-12 flex-1" />
      <Skeleton className="h-12 flex-1" />
      <Skeleton className="h-12 flex-1" />
    </motion.div>
    </div>
   
  );
}
