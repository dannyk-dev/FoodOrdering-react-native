import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link } from "expo-router";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <View style={{ marginBottom: 30 }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Welcome to Pizza Land
        </Text>
      </View>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/sign-in"} asChild>
        <Button text="Sign in" />
      </Link>
    </View>
  );
};

export default index;
