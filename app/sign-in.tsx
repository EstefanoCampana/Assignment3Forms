import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { auth } from "../lib/firebase";

interface SignInFormValues {
  email: string;
  password: string;
}

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const handleLogin = async (values: SignInFormValues) => {
    try {
      setFirebaseError(null);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // Navigate to dashboard after successful sign-in
      router.replace("/dashboard");
    } catch (error: any) {
      setFirebaseError(error.message || "Login Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Formik<SignInFormValues>
        initialValues={{ email: "", password: "" }}
        validationSchema={signInSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            {firebaseError && <Text style={styles.error}>{firebaseError}</Text>}

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <Text>Don&apos;t have an account yet?</Text>
                <TouchableOpacity onPress={() => router.replace("/sign-up")}>
                <Text style={styles.link}>Sign Up!</Text>
                </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 50
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    textAlign: "center",
    marginLeft: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 20
  }
});