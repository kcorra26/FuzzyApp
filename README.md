# Fuzzy Matching App with React Native
## __Overview__

*Assignment*: Given the 1000 entries in the attached data set, do fuzzy matching filtering when a user starts typing a name in the search field in a react native app.

### *Efficiency*: 
With the default Fuse implementation, the search was slow. Fuse.js is used on much larger datasets, so I knew there were ways to optimize the search in order to it to improve. Here's how I made the search faster:
1) threshold: This determines the similarity score at which Fuse will stop returning the results (where the score is on a scale from 0 to 1). The higher the threshold, the longer it will take for the data to update. The default is 0.6, so to reduce load time I modified it to 0.4. 
2) slicing the results: For more specific or longer searches, there are fewer results with a score above 0.4. I added a statement that further slices the result size based on the length of the results. This way, even with very common searches (ex. just A), there will be a limited number of results in order to reduce load time. 

### *Optimization*:
While Fuse.js is a functional fuzzy matching program, it left significant work to be done to optimize the search for the purpose of the assignment. Here's how I made the results better for our purposes:  
* The search was failing to rank exact matches (first and last name), and I found it was a result of the separation of the first and last name keys in the json file. To ensure that full names were identified properly, I created a modified json file with a "Full Name" key and passed that to the fuzzy matching algorithm instead. There were significant improvements.
* fieldNormWeight: Because a lot of first and last names are short (ex. Ryan Li), I wanted to ensure that matching these names were prioritized when the search query is short. The default fieldNormWeight is 1, so I increased it to 2 and found that the search improved as a result. Searching longer words (like Linda) will filter out the shorter names and ensure that the more likely matches appear first. 

### *Further Steps*
I had a limited amount of time to complete the project. If I had longer to work on it, I would: 
* Implement rigorous testing so I can more quantitatively assess the effect of altering different features of the fuse program and my algorithm.
* Optimize search when first and last names are out of order (ex. Li Ryan, Goodman Andrew). There is no specific Fuse documentation that helps with this (matchAllTokens: false should help, but it was not entirely successful), but I could build my own as an addition to the library. 
* Implement explicit exact matching rules. Sometimes multiple names will return, even when the match is exact for only one of them. I could add a constraint that limits the result to one entry if a search matches just one value. 
* Experiment with alternative matching libraries and run a script to compare the runtimes of one query. 
* Improve the user interface: adding clickability, loading screen, etc. Front end development was not the focus of the assignment, but with more time I would explore ways for seamless user interaction.  

## __How To Run__
To run the FuzzyMatch App on your computer, there are two options: 
1) If an iOS simulator from XCode is installed on your device, clone the git repository in your terminal 
and run npm start. When prompted to select a view, press i for iOS. Then wait for it to build and use the app from the simulator. 
2) Expo Go: This app was built with Expo Go. To view the project, download the Expo Go app from the App Store, create a free account. Then (with the Camera App) scan the QR code below: 


Alternatively, you can clone the repo and run npm start to get the QR code. 

## __Working Log__

## 4/12 
### *Complete*: 
* planned approach: basic design, algorithm plan, order of approach, priorities
* wrote distance algorithm for two strings (for fuzzy matching, in case I was writing my own)
* set up app with Expo, basic front-end search configuration
* parsed the csv dataset (used the csv-parser package and ran the default script to save the customer data as a json file in output.json, which I then imported to App.js)
* loaded basic information from dataset to the app (first and last name, then email) using a FlatList
* first attempt at filtering the data using a basic string check called gettingMatch 

### *To Do*: 
* replace the search matching for fuzzy: incorporate distance algo, decide how to filter (cap for similarity?) 
* enable scroll on the names that appear
* test and compare against known fuzzy matching searches

## 4/13
### *Complete*: 
* replaced gettingMatch with the Fuse.js library tool. 
* enabled scroll, added mapping and sort personal algorithm to order the results by relevance.

### *To Do*:
* run test cases, optimize Fuse.js for the given csv file. 
* add click option (highlight the name that has been clicked)
* export and instructions to run

## 4/14
### *Complete*: 
* Fuse optimization: threshold testing, json modifications, documentation research 
* Wrote writeup, logged potential improvements

### *To Do*:
* export and test

## 4/15 
### *Complete*: 
* Final export and code cleanup.