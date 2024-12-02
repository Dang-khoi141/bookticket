// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import Icon from "react-native-vector-icons/Ionicons";
// import { firebase } from '@react-native-firebase/firestore';



// const RegisterPage = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false); 

//   const handleLogin = () => {
//     navigation.navigate('Login', { selectedTab: 'LoginScreen' });
//   };

//   const register = () => {
//     firebase.auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         alert('Đăng ký thành công!'); // Hiển thị thông báo thành công
//       })
//       .catch((error) => {
//         alert(`Đăng ký thất bại: ${error.message}`); // Hiển thị thông báo lỗi
//       });
//   };
  

//   return (
//     <View style={style.container}>
//       <View style={style.header}>
//         <Text style={{ fontSize: 30, fontWeight: "500" }}>REGISTER</Text>
//       </View>
//       <View style={style.body}>
//         <View>
//           <TextInput
//             style={style.textInput}
//             placeholder='Email'
//             value={email}
//             onChangeText={setEmail}
//           />
//           <View style={style.pass}>
//             <TextInput
//               placeholder='Password'
//               secureTextEntry={!showPassword} // Sử dụng state để xác định hiển thị mật khẩu
//               value={password}
//               onChangeText={setPassword}
//             />
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//               <Icon 
//                 name={showPassword ? "eye-off-outline" : "eye-outline"} 
//                 size={30} 
//                 color="black" 
//                 style={style.icon} 
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       <View style={style.footer}>
//         <Text style={style.footerText}>When you agree to terms and conditions</Text>
//         <TouchableOpacity style={style.registerButton} onPress={() => { handleLogin(); register(); }}>
//           <Text style={style.registerButtonText}>REGISTER</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#e0f7fa",
//   },
//   header: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 40,
//   },
//   body: {
//     width: "90%",
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   textInput: {
//     borderRadius: 5,
//     backgroundColor: "#ccc",
//     borderWidth: 1,
//     height: 60,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//   },
//   pass: {
//     flexDirection: "row",
//     borderRadius: 5,
//     backgroundColor: "#ccc",
//     borderWidth: 1,
//     height: 60,
//     marginBottom: 15,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//   },
//   icon: {
//     padding: 10,
//   },
//   footer: {
//     alignItems: "center",
//     marginBottom: 90,
//   },
//   footerText: {
//     marginBottom: 10,
//   },
//   registerButton: {
//     backgroundColor: "#f44336",
//     borderRadius: 5,
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//   },
//   registerButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default RegisterPage;


import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth';

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigation.navigate('Login', { selectedTab: 'LoginScreen' });
  };

  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert('Đăng ký thành công!'); // Display success message
      })
      .catch((error) => {
        alert(`Đăng ký thất bại: ${error.message}`); // Display error message
      });
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={{ fontSize: 30, fontWeight: "500" }}>REGISTER</Text>
      </View>
      <View style={style.body}>
        <View>
          <TextInput
            style={style.textInput}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          <View style={style.pass}>
            <TextInput
              placeholder='Password'
              secureTextEntry={!showPassword} // Toggle password visibility
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={30} 
                color="black" 
                style={style.icon} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.footer}>
        <Text style={style.footerText}>When you agree to terms and conditions</Text>
        <TouchableOpacity style={style.registerButton} onPress={() => { handleLogin(); register(); }}>
          <Text style={style.registerButtonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e0f7fa",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  body: {
    width: "90%",
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: "#ccc",
    borderWidth: 1,
    height: 60,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  pass: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#ccc",
    borderWidth: 1,
    height: 60,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
  },
  footer: {
    alignItems: "center",
    marginBottom: 90,
  },
  footerText: {
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#f44336",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterPage;
