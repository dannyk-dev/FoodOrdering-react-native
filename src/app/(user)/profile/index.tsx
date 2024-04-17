import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect } from "expo-router";

export default function ProfileScreen() {
  const { session, profile, isAdmin } = useAuth();
  console.log(isAdmin);

  const signOut = () => {
    if (session) {
      supabase.auth.signOut();
      return <Redirect href="/" />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{profile?.full_name || "Profile"}</Text>
      <Button text="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});
