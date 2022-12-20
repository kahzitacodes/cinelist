import Skeleton from "react-loading-skeleton";


export function ListCardSkeleton({ cards }) {
   return Array(cards)
      .fill(0)
      .map((item, i) => (
         <div className="skeleton-cardlist" key={i}>

            <Skeleton borderRadius={15} height={420} />
            <Skeleton height={30} />
            <Skeleton height={15} />

         </div>
      ));
}