import { logout } from "@/utils/logout";
import { Redirect, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!user) {
    return <Redirect href="/" />;
  }

  const handleLogOut = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome! {user.displayName}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
      <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1f2938",
  },
  userEmail: {
    fontSize: 18,
    color: "#4b5563",
    marginBottom: 30,
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  logOutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});