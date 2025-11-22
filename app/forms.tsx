import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
  employeeID: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});

const EmployeeInfoForm = () => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default EmployeeInfoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
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
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
