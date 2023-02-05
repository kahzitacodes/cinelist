import { useRef, useEffect } from "react";

export const useOutsideClick = (callback) => {
   const ref = useRef();

   useEffect(() => {
      const handleClick = (e) => {
         callback();
      };

      document.addEventListener('click', handleClick);

      return () => {
         document.removeEventListener('click', handleClick);
      };
   }, [callback]);

   return ref;
};