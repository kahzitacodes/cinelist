import Skeleton from "react-loading-skeleton";


export function CardMovieSkeleton({ cards }) {
   return Array(cards)
      .fill(0)
      .map((item, i) => (
         <div className="skeleton-cardlist-horizontal" key={i}>
            <div className="skeleton-col1">
               <Skeleton borderRadius="20px 0 0 20px" width={160} height={230} />
            </div>

            <div className="skeleton-col2">
               <Skeleton height={30} width="80%" />
               <Skeleton height={15} width={100} />
               <Skeleton height={15} count={4} />
            </div>
         </div>
      ));
}