# University Data Scraping
- Given a list of urls to Naviance profiles in a .txt file, program will download key information about the college.
- Aid in college search

## Dependencies ⚙️
Please have Node JS and Node Package Manager (NPM) installed: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
Run `npm install` in root of project to install dependencies 

## Usage guide 🤔
1. Create list.txt file in root folder and populate with Naviance urls, seperated by line break.
2. Sign in to https://student.naviance.com
3. Get API token by entering the following code in console (ctrl+shift+j/cmd+shift+j) and hitting enter `window.localStorage.deepLinkingAuthorizedToken`
4. Create a .env file at root with the contents API_KEY=result-of-step-3 (example in .env.sample)
5.  
