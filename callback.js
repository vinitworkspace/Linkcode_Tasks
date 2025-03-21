function greet(name, callback) {
    console.log("Hello, " + name);
    callback(); 
  }
  
  function sayGoodbye() {
    console.log("Good Morning!");
  }
  
  greet("Vinit", sayGoodbye);