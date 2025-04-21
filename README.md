# Setup
## To Setup Environment
`npm install` (Adds node_modules file locally with dependencies in package.json)  
_When working with a previously setup environment, delete package-lock.json file and node_modules folder before running npm install._

## To Run Server and Website Locally
### Terminal 1
`node server/app.js`
### Terminal 2
`npm run build`\
`npm run preview` (or `npm run dev`)

### Image example for terminal setup:
![image](https://github.com/user-attachments/assets/1ef3606e-aaa7-4b2e-b408-b823dbf473fa)

The localhost link is where the project can then be viewed (i.e. http://localhost:5173/exercise-app/).

Use Control C to stop server or website

## To Run Test Suite
After running npm install, run tests via Vitest with the command:
`npm run test` <br>
_Runs tests found in exercise-app\src\components\ExerciseComponent.test.jsx._
