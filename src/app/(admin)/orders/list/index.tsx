import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";

const OrdersScreen = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItemListItem order={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
