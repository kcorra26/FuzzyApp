import { useState } from "react";
import { StyleSheet, SafeAreaView, TextInput, Text, FlatList, View} from 'react-native';
import json from './output.json';

export default function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedData, setDisplayedData] = useState(json);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = json.filter((item) => {
            // return Object.keys(item).some(key =>
            //     item[key].toLowerCase().includes(formattedQuery)
            // );
            return gettingMatch(item, formattedQuery);
            // practice function: TODO figure out how to match with fuzzy
        });
        setDisplayedData(filteredData);
    }

    const gettingMatch = (item, query) => {
        return Object.keys(item).some(key => item[key].toLowerCase().includes(query));
    }

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
          onChangeText={handleSearch}
        />

        <FlatList 
            data={displayedData}
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
