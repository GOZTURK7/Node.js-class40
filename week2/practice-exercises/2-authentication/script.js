
/**
 * 2. Authentication
 * 
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */

import fetch from 'node-fetch';
async function printBooks() {
  const url = 'https://restapiabasicauthe-sandbox.mxapps.io/api/books';
  // YOUR CODE GOES IN HERE
  try{
    let response = await fetch(url, {headers: { 'Authorization': 'Basic YWRtaW46aHZnWDhLbFZFYQ' }})
      let data = await response.json();
      console.log(data);
    
    
  }catch(error){
    console.log(error.message);
  }

 


}

printBooks();