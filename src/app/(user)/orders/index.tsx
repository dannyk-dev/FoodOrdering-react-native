import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import OrderItemListItem from "@/src/components/OrderListItem";
import { useCurrentOrders } from "@/src/api/orders";

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useCurrentOrders();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

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
