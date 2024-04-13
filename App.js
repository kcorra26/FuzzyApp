import { useState } from "react";
import { StyleSheet, SafeAreaView, TextInput, Text, FlatList, View} from 'react-native';
import json from './output.json';
import {gettingDist} from './str_comp.js';
import Fuse from 'fuse.js';

const options = {
    threshold: 0.6,
    keys: ['First Name', 'Last Name']
}

const fuse = new Fuse(json, options);

export default function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedData, setDisplayedData] = useState(json);
    const searchableKeys = ['First Name', 'Last Name'];

    const handleSearch = (query) => {
        //console.log("search query:", query);
        setSearchQuery(query);
        // const formattedQuery = query.toLowerCase();
        // const filteredData = json
        //     .filter((item) => {
        //         return gettingMatch(item, formattedQuery);
        //     })
        //     .map(item => {
        //         const full_name = item['First Name'].concat(" ", item['Last Name']);
        //         return {
        //             ...item,
        //             distance: (gettingDist(full_name, formattedQuery))
        //             //distance: gettingDist(item['First Name'].concat(" ", item['Last Name']), query)
        //         };
        //     })
        //     .sort((a,b) => a.distance - b.distance);
        // setDisplayedData(filteredData);
        const result = fuse.search(query);
        //console.log("search results:", result)
        setDisplayedData(result.map(({ item }) => item));
    }

    const gettingMatch = (item, query) => {
        //return searchableKeys.some(key => item[key].toLowerCase().includes(query.toLowerCase()));
        //return searchableKeys.some(key => gettingDist(item[key].toLowerCase(), query) <= 3);
        //const val_to_check = 
        const full_name = item['First Name'].concat(" ", item['Last Name']);
        const lev_dist = gettingDist(full_name, query);
        //return lev_dist <= 6;
        return lev_dist <= Math.max(query.length, full_name.length) * 0.9;
        // issue is that first and last names, shorter ones are showing up bc 
    }

  return (
    <SafeAreaView style={{flex:1,marginHorisontal:20}}>
        <TextInput 
        keyboardType="web-search"
          placeholder='Searching'  // FIX
          clearButtonMode='always' 
          style={styles.searchBox}
          autoCorrect={false}
          autoCapitalize="none"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <FlatList 
            data={displayedData}
            scrollEnabled={true}
            keyExtractor={(item) => item["Customer Id"]} // unique key we can use from the dataset
            renderItem={({item}) => (
                <View style={styles.itemContainer}>
                    <Text style={styles.textName}>{item["First Name"]} {item["Last Name"]}</Text>
                    <Text style={styles.textEmail}>{item["Email"]}</Text>
                </View>
                // maybe some more attributes in here too (image or initials?)
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
  }, // ALL customizable -- can change later if i want

//   scrollView: {
//     marginHorizontal: 20,
//   },

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
