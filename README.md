
# KeebInv
Welcome to the KeebInv source code, you can take a look at the live site at [keebinv.justinm.dev](https://keebinv.justinm.dev).

### What is KeebInv?
KeebInv is a website that allows users to search the top Canadian keyboard part vendors to compare inventory and prices. It was built in React and uses Ant Design as the CSS component library. All data is collected server side on the Node JS & Express JS API. It takes advantage of Puppeteers use of the headless Chromium browser instance to scrape the data from various websites.


## Tech Stack

**Client:** React, React Router, Ant Design

**Server:** Node, Express, Puppeteer


## Demo

<img src="https://github.com/justinm35/keeb-inv-project/blob/b4c8b63238179b6fac37c1472afa9c55fb7724f7/KeebInv-Demo-min.gif" width="600">

## Run Locally

To deploy this project first you must have node and npm installed globally.

Clone the repository:

```bash
  git clone https://github.com/justinm35/keeb-inv-project.git
```

Un-comment line:22 of the /functions/index.js file to allow express to listen to port 3800.

In the app.jsx file change line:23 within the quotations to "http://localhost:3800"

Install all node packages (in root and in functions folder):

```bash
  npm install
```

To start the client locally cd into the root directory and run:

```bash
  npm run dev
```

To start the API server locally cd into the functions directory and run: 

```bash
  nodemon index.js
```

Vite will select a port that is available on your machine to host on. Vite will then display the URL in the console. Use that URL to access the UI.
### Thanks for checking out my project :)
