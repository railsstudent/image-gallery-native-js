Image Gallery

# Problem Statement
This image gallery application makes request to Pixabay public API to retrieve 15 images of swan and render them in HTML page. When an image is clicked, it is shown in an image modal. User can click previous button to preview the previous one or click next button to preview the next one. When previewing is done, user can clock close button to close the modal to return back to image gallery.

# Architecture
This is a simple website consisted of JS, SCSS and HTML.  JS code files encapsulate front-end logic and CSS styling is documented in SCSS file, style.scss.  
`gallery.js` defines UI logic of image gallery and image modal. It is consisted of functions that listen to button events to open/close image modal and render specific image. Moreover, the functions optionally add or remove CSS class to show/hide buttons programmatically.   
`slideshow.js` modals the behaviour of image modal. SlideShow accepts a list of urls and returns a given url based on index. The class has helper functions to determine whether an image is the first or last image. The result is used by image gallery to update opacity of left, right buttons respectively.

```
# Project structure
src/
   --- scss/style.css
   --- js/gallery.js
   --- js/slideshow.js
   --- index.html
```


# Technology Stack
* `JavaScript` -  native JS code to render images and image modal in HTML page 
* `SCSS`   - style image gallery and compiled to CSS by gulp-sass plugin
* `ES2018` - write unit test and UI test codes to be executed by puppeteer and mocha
* `gulp` - build system to minify codes, generate static website, hot reload and run linting and testing 
* `Eslint` - report bad coding styles in JavaScript files
* `Mocha` - execute unit tests and UI tests written in JavaScript
* `Pupeeteer` - provide headless Chrome API to allow developer to run UI test on command line 
* `Karma` - test runner to run tests in headless browser and collect code coverage 

# Live Site
https://jolly-mccarthy-37eb03.netlify.com/

# Github Repository
https://github.com/railsstudent/image-gallery-native-js

# Requirements
1. Require node version 8.10.0+ to run gulp-eslint plugin and puppeteer test cases properly
2. Obtain Pixabay API Key to retrieve public images
    1. Visit https://pixabay.com/en/ and sign up an account
    2. Log in and visit https://pixabay.com/api/docs/ to look up the API key
    3. Create an `.env` file in the root directory of the project and save the API key in the file

    ```dosini
    API_KEY=<Pixabay API Key>
    ```

# Set up local environment
1. Install dependencies
    ```javascript
    # with npm
    npm install

    # or with yarn
    yarn install
    ```
2. Build source code to dist/ directory 
    ```
    # with npm
    npm start
    
    # or with yarn
    yarn build
    ``` 
    or

3. Hot reload website at http://localhost:3000
    ```javascript
    # with npm
    npm start
    
    # or with yarn
    yarn start
    ```

# Linting
Eslint rules are applied to JavaScript source codes and test codes to find bad coding styles. Warning and error messages can be seen in terminal.
```javascript
# with npm
npm run lint

# or with yarn
yarn lint
```

# Testing
Unit and UI tests are provided in this project and they can be found in `test/` directory.
* `bootstrap.js` - stores global variables that are reused in gallery.test.js
* `bootstrap.karma.js` - stores global variables that are reused in slideshow.test.js
* `slideshow.test.js` - test cases for unit testing SlideShow class
* `gallery.test.js` - UI test cases for gallery page and image modal

    ### Step 1: Serve static website 
    * Open a terminal to serve the static website at http://localhost:8000 
        ```javascript
        # with npm
        npm run serve:test

        # or with yarn
        yarn serve:test
        ```

    ### Step 2a: Run gallery test cases without screenshot
    * Open a new terminal to run UI tests on command line
        ```javascript
        # with npm
        npm run puppeteer

        # or with yarn
        yarn puppeteer
        ```
        or 

    ### Step 2b: Run gallery test cases with screenshots
    * Open a new terminal to run UI tests on command line
        ```javascript
        # with npm
        npm run puppeteer-screenshot

        # or with yarn
        yarn puppeteer-screenshot
        ```
    In both cases, test screenshots are saved in `test/` directory to verify visual results.

    ### Step 3: Run slideshow test cases and collect lcov code coverage
    * Open a new terminal to run unit tests on command line
        ```javascript
        # with npm
        npm run test

        # or with yarn
        yarn test

    ### Step 4: See lcov code coverage results in browser
    * Open a new terminal to serve the report files at http://localhost:8001 
        ```javascript
        # with npm
        npm run serve:coverage

        # or with yarn
        yarn serve:coverage

# Make production-build
Run npm script to build JS, html and css files to `dist/` directory

```javascript
# with npm
npm run build-dist

# or with yarn
yarn build-dist
```

```
# Final directory structure
dist/
   --- css/style.css
   --- js/all.js
   --- index.html
```

# Deployment to Netlify
## First deployment
1. Login https://www.netlify.com/
2. If it is first-time deployment, click `New Site From Git` button
3. Choose `Github` under Continuous Deployment
4. Choose `master` branch to deploy
5. Input `npm run build-dist` in Build command textbox
6. Input `dist/` in publish directory textbox
7. Expand Advanced build settings to add API Key of Pixabay. Key is 'API_KEY' and value is the API Key in your `.env` file.
8. Click `Deploy site` button and wait for the code to push to netlify hosting

## Further deployment
1. Netlify auto-deploy from Github to production site when new code is pushed to master branch in remote repository. 

# Area of Improvements 
1. Image urls of Pixable are temporary and they become invalid without warning. During page load, the application always makes request to Pixabay and very often, the same set of urls is returned.
    1. One improvement is to cache URLs in local storage and render them directly.  
    2. If any cached url returns error, web application makes request to the API again to retrieve a fresh set of urls and render them on the page. 
2. Descriptive error message. Currently, a generic error message is displayed in website when API request fails. Descriptive error message can be shown for different scenarios, for example, rate limit hit, invalid API key, image url not accessible etc.


# Open Source Project
1. [Codebuddies Repo](https://github.com/railsstudent/codebuddies)
    * One of the primary code contributors of the project. Contributes to UI changes, meteor backend codes and CRUD operations in MongoDB  
    * [Live site](https://codebuddies.org/)

# Some Angular exercises of mine
1. [Todo App](https://github.com/railsstudent/angular-redux-todo)
    * Build a Todo app with Angular 6 and Ngrx 6, a state management library  
    * [Github Page](https://railsstudent.github.io/angular-redux-todo/)
2. [Custom time zone converter](https://github.com/railsstudent/ng-time-converter)
    * Build custom time zone converter element in Angular 6 
    * Custom elements can reuse in static website and in other JS Framework
    * Work in Chrome only due to other browsers do not support shadow DOM
    * [Vue App](https://railsstudent.github.io/vue-time-converter/)
    * [Static website in surg.sh](http://yummy-trick.surge.sh/)


