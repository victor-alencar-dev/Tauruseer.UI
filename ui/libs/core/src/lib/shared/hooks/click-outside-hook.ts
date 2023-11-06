import { MutableRefObject, useEffect } from 'react';

export function useClickOutSide(ref: MutableRefObject<any>, callback: (target: any) => void) {
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event.target);
      }
    }

    // Bind event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      //Clean up to remove event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
