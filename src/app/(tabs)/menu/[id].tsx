import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const product = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: "Details" }} />
      <Text>Details for id: {id}</Text>
    </View>
  );
};

export default product;

const styles = StyleSheet.create({});
