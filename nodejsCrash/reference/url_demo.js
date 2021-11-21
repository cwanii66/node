const url = require('url');

const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active');

//serialize url
console.log(myUrl.href);
console.log(myUrl.toString());

// host(root domain)
console.log(myUrl.host);
// does not get port
console.log(myUrl.hostname);

console.log(myUrl.pathname);

// serialized query
console.log(myUrl.searchParams);

console.log(myUrl.searchParams.toString());

// add param
myUrl.searchParams.append('abc', '123');

//loop through params
myUrl.searchParams.forEach((value, name) => {
    console.log(`${name}: ${value}`);
})


