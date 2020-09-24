import React, { useEffect, useState } from 'react';

export default function Timer(props) {
  const [time, setTime] = useState(props.time);
  let i = props.time;
  useEffect(() => {
    const timer = setInterval(() => {
      i--;
      if(i == 0){
        clearInterval(timer)
      }
      setTime(i);
    }, 1000);

    return () => {
      clearInterval(timer)
    }
  }, []);

  return (
    <p>
		  {parseInt(time / 60)} : {time % 60 > 9 ? time % 60 : "0"  + time % 60}
		</p>
  )
}