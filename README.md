# Fuzzy Matching App on React Native
## Working Log

## 4/12 
## Complete: 
* planned approach: basic design, algorithm plan, order of approach, priorities
* wrote distance algorithm for two strings (for fuzzy matching)
* set up app with Expo, basic front-end search configuration
* parsed the csv dataset (used the csv-parser package and ran the default script to save the customer data as a json file in output.json, which I then imported to App.js)
* loaded basic information from dataset to the app (first and last name, then email) using a FlatList
* first attempt at filtering the data using a basic string check called gettingMatch 

## TODO: 
* replace the search matching for fuzzy: incorporate distance algo, decide how to filter (cap for similarity?) 
* enable scroll on the names that appear
* test and compare against known fuzzy matching searches