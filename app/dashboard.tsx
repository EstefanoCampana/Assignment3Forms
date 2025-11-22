import { logout } from "@/utils/logout";
import { Redirect, router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
  employeeID: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});

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
        <Text style={styles.title}>Employee Information</Text>

        <Formik
          initialValues={{
            name: "",
            department: "",
            position: "",
            employeeID: "",
            phone: "",
          }}
          validationSchema={EmployeeSchema}
          onSubmit={(values) => console.log(values)}
        >
          {({
            handleChange,
            handleBlur,
            submitForm,
            values,
            errors,
            touched,
          }) => (
            <>

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}


              <TextInput
                style={styles.input}
                placeholder="Department"
                onChangeText={handleChange("department")}
                onBlur={handleBlur("department")}
                value={values.department}
              />
              {touched.department && errors.department && (
                <Text style={styles.error}>{errors.department}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Position"
                onChangeText={handleChange("position")}
                onBlur={handleBlur("position")}
                value={values.position}
              />
              {touched.position && errors.position && (
                <Text style={styles.error}>{errors.position}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Employee ID"
                onChangeText={handleChange("employeeID")}
                onBlur={handleBlur("employeeID")}
                value={values.employeeID}
              />
              {touched.employeeID && errors.employeeID && <Text style={styles.error}>{errors.employeeID}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

              <TouchableOpacity
              onPress={submitForm}  
              style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
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
    marginTop: 20
  },
  formsButton: {
    backgroundColor: "#3c00ffff",
    color: "#ffffff",
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1e293b",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: "#f8fafc",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 15
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});