export default function iPromiseIwillReadBFromA(A :any, B:any) {
    return new Promise((resolve, reject) => {
      let response = A.B 
      setTimeout(() => {
        console.log("response from async Reading of property "+B+"of A"+response)
        // Assuming A is successfully read and contains data, we proceed to resolve the promise with B
        resolve(response);
      }, 2000); // 2000 milliseconds delay (adjust the delay as needed)
    });
  }