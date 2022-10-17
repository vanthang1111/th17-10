import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

import Pagination from "./components/Pagination";

export default function App() {
  const [data, setData] = useState([]);

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;

  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(data.length / recordsPerPage);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((res) => res.json())
      .then((resJson) => setData(resJson));
  };

  console.log(data);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: `${item.movie_banner}` }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <FlatList data={currentRecords} renderItem={renderItem} />
      </View>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  card: {
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {},
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
});
