# Fuzzy Matching App with React Native
__Overview__
Assignment: Given the 1000 entries in the attached data set, do fuzzy matching filtering when a user starts typing a name in the search field in a react native app.

### *Efficiency*: 
***** IF MY OWN ALGO ******
The gettingDist algorithm determines a basic similarity value between two strings by comparing the similarities of the substrings. Without dynamic programming (which stores the similarity value of each substring), the algorithm would complete in upwards of O(3^n) time. This is extremely inefficient. 
To avoid a costly runtime, we use a matrix to store the similarity value at each a and b length combination. Because each value is only determined once and can then be extracted in O(1) time from our matrix, gettingDist finishes in O(n*m) time, where n and m are the lengths of strings a and b, respectively. Because this function is called on all of the names in the database, this optimization is crucial for the efficiency of our program.

***** ELSE ******
With the default Fuse implementation, the search was slow. Fuse.js is used on much larger datasets, so I knew there were ways to optimize the search in order to it to improve. 
1) slicing the results: 
2) threshold: 

### *Optimization*:
While Fuse.js is a functional fuzzy matching program, it left significant work to be done to optimize the search for the purpose of the assignment. How I made it better:  
* The search was failing to rank exact matches (first and last name), and I found it was a result of the separation of the first and last name keys in the json file. To ensure that full names were identified properly, I created a modified json file with a "Full Name" key and passed that to the fuzzy matching algorithm instead. There were significant improvements.
*  

How I can make it better: 
* implement rigorous testing so I can more quatitatively assess the effect of altering different features of the fuse program and my algorithm.
* experiment with alternative matching libraries and run a script to compare the runtimes of one query. 
* improve the user interface: adding clickability, loading screen, etc. Front end development was not the focus of the assignment, but it **. 


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
2) ***
* experimented with Fuse.js to compare the efficiency of an external library to what I have already written 

### *To Do*:
* decide which implementation to use for fuzzy match
* run test cases (which one works best for our purposes)
* add click option (highlight the name that has been clicked)
* basic improvements to algorithm
* export and instructions to run

## 4/14
### *Complete*: 
* Fuse optimization: threshold testing, json modifications, documentation research 
* Writeup complete

### *To Do*:
* export and test