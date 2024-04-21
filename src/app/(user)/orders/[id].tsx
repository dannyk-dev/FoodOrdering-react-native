import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useOrderDetails } from "@/src/api/products";
import { useUpdateOrderSubscription } from "@/src/api/orders/subscriptions";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !order) {
    return (
      <View style={styles.container}>
        <Text>{error?.message || "No orders found"}</Text>
      </View>
    );
  }

  // const order = orders.find((order) => order.id === +id);

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
});
