import React, { useState } from "react";

function Random_Pepe() {
  let img_arr = [];
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 86)
  );

  for (let i = 1; i <= 86; i++) {
    img_arr.push(require(`./img/pepe_${i}.png`));
  }

  const onRandom = () => {
    setRandomNumber(Math.floor(Math.random() * 86));
  };

  return (
    <>
      <img src={img_arr[randomNumber]} />
      <br />
      <button onClick={onRandom}>Random Pepe</button>
    </>
  );
}

export default Random_Pepe;
