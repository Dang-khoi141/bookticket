import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { firebase } from '@react-native-firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const handleLogin = () => {
  
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Đăng nhập thành công
        const user = userCredential.user;
        alert('Đăng nhập thành công!'); // Hiển thị thông báo
        navigation.navigate('Home'); // Điều hướng đến màn hình 'Home'
      })
      .catch((error) => {
        // Lỗi khi đăng nhập
        alert(`Đăng nhập thất bại: ${error.message}`); // Hiển thị lỗi
      });
  };
  

  const handleRegister = () => {
    navigation.navigate('registerpage', { selectedTab: 'registerpage' });
};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/image/Icon/airplane.png")} style={styles.logo}/>
        <Text style={styles.title}>Hello Again!</Text>
        <Text style={styles.subtitle}>Log into your account</Text>
      </View>

      <View style={styles.inputContainer}>
  <View style={styles.inputWrapper}>
    <Icon name="mail" size={20} color="black" style={styles.icon} />
    <TextInput
      style={[styles.input, { paddingLeft: 40 }]}
      placeholder="Enter your email address"
      placeholderTextColor="#aaa"
      value={email}
      onChangeText={setEmail}
    />
  </View>
  <View style={styles.inputWrapper}>
    <Icon name="lock-closed-outline" size={20} color="black" style={styles.icon} />
    <TextInput
      style={[styles.input, { paddingLeft: 40 }]}
      placeholder="Enter your password"
      placeholderTextColor="#aaa"
      secureTextEntry={!showPassword}
      value={password}
      onChangeText={setPassword}
    />
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Icon 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="black" 
              />
      </TouchableOpacity>
  </View>
</View>


      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPasswordButton} 
      onPress={handleRegister}
      >
        <Text style={styles.forgotPasswordText}>Sign up for an account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <View style={styles.socialContainer}>
      <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-facebook" size={24} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-apple" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    left:340,
    top: 13,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 20,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 40,
    color: '#333',
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 13,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: '#4AA7C0',
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00C0C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#aaa',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },

});

export default LoginScreen;