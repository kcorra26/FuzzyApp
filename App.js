import { useState } from "react";
import { StyleSheet, SafeAreaView, TextInput, Text, FlatList, View} from 'react-native';
import json from './output.json';
import {gettingDist} from './str_comp.js';
import Fuse from 'fuse.js';

const adjustedData = json.map(item => ({
    ...item,
    fullName: `${item["First Name"]} ${item["Last Name"]}`
}))

const options = {
    includeScore: true,
    threshold: 0.4, // wondering how low to put this
    keys: [ "fullName", "First Name", "Last Name" ], 
    fieldNormWeight:2,
    distance: 50,
    matchAllTokens: true
}

const fuse = new Fuse(adjustedData, options);

export default function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedData, setDisplayedData] = useState(json);
    //const searchableKeys = ['First Name', 'Last Name'];

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

    const handleSearchMine = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = json
            .filter((item) => {
                return gettingMatch(item, formattedQuery);
            })
            .map(item => {
                const full_name = item['First Name'].concat(" ", item['Last Name']);
                return {
                    ...item,
                    distance: (gettingDist(full_name, formattedQuery))
                    //distance: gettingDist(item['First Name'].concat(" ", item['Last Name']), query)
                };
            })
            .sort((a,b) => a.distance - b.distance);
        setDisplayedData(filteredData);
    }

    const gettingMatch = (item, query) => {
        const full_name = item['First Name'].concat(" ", item['Last Name']);
        const lev_dist = gettingDist(full_name, query);
        //return lev_dist <= 6;
        return lev_dist <= Math.max(query.length, full_name.length) * 0.9;
        // issue is that first and last names, shorter ones are showing up bc 
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
            keyExtractor={(item) => item["Customer Id"]} // unique key we can use from the dataset
            //extraData={selectedId}
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
