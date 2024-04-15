import { useState } from "react";
import { StyleSheet, SafeAreaView, TextInput, Text, FlatList, View} from 'react-native';
import json from './output.json'; // converted csv file
import Fuse from 'fuse.js';

// Creating a new dataset with a "Full Name" key in order to consider
// first and last names together as well as individually in Fuse. 
const adjustedData = json.map(item => ({
    ...item,
    fullName: `${item["First Name"]} ${item["Last Name"]}`
}))

// Customization to optimize the Fuse results for our purposes. Strategies
// explained in README
const options = {
    threshold: 0.4, 
    keys: [ "fullName", "First Name", "Last Name" ], 
    fieldNormWeight:2,
    distance: 50,
    matchAllTokens: false
}

const fuse = new Fuse(adjustedData, options);

export default function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedData, setDisplayedData] = useState(json);

    // Fuzzy match using a common, lightweight fuzzy-search library. 
    // Optimized for the given database. 
    const handleSearchFuse = (query) => {
        setSearchQuery(query);
        const result = fuse.search(query);
        const fraction = result.length * 0.4; // limiting the results for a faster load
        let visibleResults = result;
        if (fraction > 0){
            visibleResults = result.slice(0,fraction);
        }
        setDisplayedData(visibleResults.map(({ item }) => item));
    }

  // Simple front end setup, with a dynamic FlatList for the search results.
  return (
    <SafeAreaView style={{flex:1,marginHorisontal:20}}>
        <TextInput 
        keyboardType="web-search"
          placeholder='Search'
          clearButtonMode='always' 
          style={styles.searchBox}
          autoCorrect={false}
          autoCapitalize="none"
          value={searchQuery}
          onChangeText={handleSearchFuse}
        />

        <FlatList
            data={displayedData}
            scrollEnabled={true}
            keyExtractor={(item) => item["Customer Id"]}
            renderItem={({item}) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.textName}>{item["First Name"]} {item["Last Name"]}</Text>
                    <Text style={styles.textEmail}>{item["Email"]}</Text>
                </View>
            )}
        />
    </SafeAreaView>
  );
}

// Common styles to render the front end. 
const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal:20,
    paddingVertical:10,
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius:8,
  }, 

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },

  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },

  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
  }

});
