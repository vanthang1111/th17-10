import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState(1);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
      setActiveTab(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActiveTab(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={prevPage} style={styles.prevBtn}>
        <FontAwesome name="arrow-left" color="#fff" />
      </Pressable>
      {pageNumbers.map((pgNumber) => {
        return (
          <Pressable
            onPress={() => setCurrentPage(pgNumber)}
            style={activeTab === pgNumber ? styles.active : styles.numberBtn}
          >
            <Text style={styles.numberText}>{pgNumber}</Text>
          </Pressable>
        );
      })}
      <Pressable onPress={nextPage} style={styles.nextBtn}>
        <FontAwesome name="arrow-right" color="#fff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 20,
    backgroundColor: "#00ABB3",
  },
  prevBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nextBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  numberBtn: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  numberText: {
    color: "#fff",
  },
  active: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});

export default Pagination;
