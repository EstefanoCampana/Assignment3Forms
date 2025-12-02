import { logout } from "@/utils/logout";
import { Redirect, router } from "expo-router";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { db } from "../lib/firebase";

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
  employeeID: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});

interface FormValues {
  name: string;
  department: string;
  position: string;
  employeeID: string;
  phone: string;
}
interface Employee extends FormValues {
  id: string;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const initialValues = {name: "",
            department: "",
            position: "",
            employeeID: "",
            phone: "",}
  const [employees, setEmployees] = useState<Employee[]>([]);
 
useEffect(() => {
  async function loadProfile() {
    const employeesRef = collection(db, "employees");
    const snap = await getDocs(employeesRef);
 
    if (!snap.empty) {
      const list: Employee[] = snap.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as FormValues),
      }));
 
      setEmployees(list);
    }
  }
 
  loadProfile();
}, []);

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
  
  const submitForm = async (values: FormValues, actions: any) => {
    try{
          await addDoc(collection(db, "employees"),{
          name: values.name,
          department: values.department,
          position: values.position,
          employeeID: values.employeeID,
          phone: values.phone
        });
        actions.resetForm()
      } catch (firestoreError) {
        console.log(
          firestoreError
        );
      }
  }

  const handleLogOut = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <View style={{flex:1, flexDirection: "column", alignSelf: "flex-start"}}>
        <Text style={styles.welcome}>Welcome! {user.displayName}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.title}>Employee Information</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={EmployeeSchema}
          onSubmit={submitForm}
          
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
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

              <View style={{flexDirection: "row", alignItems: "center", gap: 20, justifyContent: "center"}}>
              <TouchableOpacity
              onPress={() => handleSubmit()}  
              style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

            <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          </View>
            </>
          )}
        </Formik>
      </View>

      <ScrollView style={{flex:1, alignContent: "center", borderRadius: 10, backgroundColor:"#fff", paddingTop: 75, borderWidth: 2}}>
        <Text style={styles.title}>Employees</Text> {employees.map((emp) => (
          <View key={emp.id} style={{ margin: 5, borderRadius: 10, backgroundColor:"#2563eb",borderWidth: 2, borderColor: "#fff", padding: 30}}>
            <Text style={{fontSize: 16, textAlign: "center", color: "#fff"}}>Name: {emp.name}</Text>
            <Text style={{fontSize: 16, textAlign: "center", color: "#fff"}}>Department: {emp.department}</Text>
            <Text style={{fontSize: 16, textAlign: "center", color: "#fff"}}>Position: {emp.position}</Text>
            <Text style={{fontSize: 16, textAlign: "center", color: "#fff"}}>Employee ID: {emp.employeeID}</Text>
            <Text style={{fontSize: 16, textAlign: "center", color: "#fff"}}>Phone: {emp.phone}</Text>
          </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "space-evenly",
    gap: 20,
    alignItems: "center",
    padding: 20,
    flexDirection: "row"
  },
  welcome: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1f2938",
    textAlign: "center"
  },
  userEmail: {
    fontSize: 18,
    color: "#4b5563",
    marginBottom: 30,
    textAlign: "center"
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  logOutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  formsButton: {
    backgroundColor: "#3c00ffff",
    color: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
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