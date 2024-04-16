import { View, Text, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();

  const order = orders.find((order) => order.id === +id);

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: `Order Details: #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
}
