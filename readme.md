# How to set up Arianee with React Native (Expo)

This is a adapted version of https://gist.github.com/dougbacelar/29e60920d8fa1982535247563eb63766.

### Installation guide
1. Make sure you have Node version 6 or later installed, if not, get it on the [Node website](http://nodejs.org/)

	`node --version`
    
    
2. Install [Create React Native App](https://github.com/react-community/create-react-native-app)

	`npm install expo-cli --global`
	
    `expo init my-new-project`
    
    `cd my-new-project`
    

3. Use create-react-native-app to create the project boilerplate

	`create-react-native-app my-app`

4. Install [node-libs-browser](https://github.com/webpack/node-libs-browser)
	
    `npm install --save node-libs-browser`


5. Create a file called *rn-cli.config.js* on the root of the project and add the following code into it:
	
    ```javascript
   	const extraNodeModules = require('node-libs-browser');
    
   	module.exports = {
   	  extraNodeModules,
   	};
	```

6. Create a file called *global.js* on the root of the project and add the following code into it:

	```javascript
    // Inject node globals into React Native global scope.
	global.Buffer = require('buffer').Buffer;
	global.process = require('process');
	
	if (typeof btoa === 'undefined') {
	  global.btoa = function (str) {
	    return new Buffer(str, 'binary').toString('base64');
	  };
	}

	if (typeof atob === 'undefined') {
	  global.atob = function (b64Encoded) {
	    return new Buffer(b64Encoded, 'base64').toString('binary');
	  };
	}

	```
    
7. Import the *global.js* file into your *[App.js]()* file
```javascript
   	import './global';
```
   
8. Install [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015)
	
	`npm install --save-dev babel-cli babel-preset-es2015`
    
9. Now we can install the Arianee 

	`npm install --save @arianee/arianeejs`
    
10. Require the API in your `App.js` file

```javascript
  import {Arianee} from "@arianee/arianeejs";
```

11. Add the following code inside your React component in `App.js` to get started with consuming the API. The code will print information of the balance of POA 
 and do one tansaction on blockchain.

	```javascript
    componentWillMount() {
          const $wallet=new Arianee().init()
              .then(arianee=>arianee.fromRandomKey());
      
          $wallet.then(async w=>{
             console.log("Wallet initialized")
             await w.requestPoa();
             console.log("POA faucet called")
             await w.methods.approveStore();
             console.log("Store approved")
             const b= await w.methods.balanceOfPoa();
             console.log("POA Balance",b)
        }
    }

	```
    
12. Test it

	`npm start`
    
    or
    
	`npm run ios`
    
    or
    
    `npm run android`

13. Warning
You may have 2 warning in your console:
```bash
Warning: The provided value 'ms-stream' is not a valid 'responseType'.
```
And
```bash
Warning: The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.
```

They are just warnings, but Arianee is working fine.
