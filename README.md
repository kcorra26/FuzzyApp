# Fuzzy Matching App with React Native
__Working Log__

## 4/12 
### *Complete*: 
* planned approach: basic design, algorithm plan, order of approach, priorities
* wrote distance algorithm for two strings (for fuzzy matching)
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
* replaced basic string comparison function with the dynamic programming algorithm that I wrote yesterday. 
* enabled scroll, added mapping and sort to order the results by relevance.
* ran into a few problems: 
1) just calculating the Levenstein distance between string and query using a threshold (ex. distance is 2) means that the desired name often doesn't show until far into the text (ex 'Andrew' doesn't show up when you've typed 'And' because the distance between the strings is still 3). 
2) 
* experimented with Fuse.js to compare the efficiency of an external library to what I have already written 