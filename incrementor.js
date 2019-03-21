  //accepts val to increment/decrement, and speed
  //looks at val, and increments or decrements it based on if the circle is hitting a variable
  function setDirection(val, speed) {
      //set valIsIncreasing to true or false
      if (val <= 0 + r) {
          valIsIncreasing = true;
      }
      if (val >= height - r) {
          valIsIncreasing = false;
      }
      //increment or decrement val
      valIsIncreasing ? val = val + speed : val = val - speed;
      console.log(val);
  }