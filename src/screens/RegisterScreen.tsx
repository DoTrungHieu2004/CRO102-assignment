import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
import { registerUser } from '../services/api';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !phoneNumber || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const existing = await fetch(`${API_URL}/users?email=${email}`);
    const users = await existing.json();
    if (users.length > 0) {
      Alert.alert('Lỗi', 'Email đã tồn tại!');
      return;
    }

    const newUser = await registerUser({ name, email, phoneNumber, password });
    Alert.alert('Thành công', 'Đăng ký thành công, vui lòng đăng nhập lại');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/bg/ellipse2.png')} />

      <Text style={styles.title}>Đăng ký</Text>
      <Text style={styles.subtitle}>Tạo tài khoản</Text>

      <TextInput
        style={[
          styles.inputWrapper,
          focusedInput === 'name' && styles.inputFocused
        ]}
        placeholder='Họ tên'
        placeholderTextColor='#8b8b8b'
        value={name}
        onChangeText={setName}
        onFocus={() => setFocusedInput('name')}
        onBlur={() => setFocusedInput(null)}
      />

      <TextInput
        style={[
          styles.inputWrapper,
          focusedInput === 'email' && styles.inputFocused
        ]}
        placeholder='Email'
        placeholderTextColor='#8b8b8b'
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput(null)}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput
        style={[
          styles.inputWrapper,
          focusedInput === 'phone-number' && styles.inputFocused
        ]}
        placeholder='Số điện thoại'
        placeholderTextColor='#8b8b8b'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        onFocus={() => setFocusedInput('phone-number')}
        onBlur={() => setFocusedInput(null)}
        keyboardType='phone-pad'
        autoCapitalize='none'
      />

      <View style={[styles.inputWrapper, focusedInput === 'password' && styles.inputFocused]}>
        <TextInput
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#999"
          />
        </Pressable>
      </View>

      <Pressable style={{ width: '80%' }} onPress={handleRegister}>
        <LinearGradient
          colors={[ '#007357', '#4caf50' ]}
          style={styles.signupButton}
          start={[0, 0]}
          end={[1, 0]}
        >
          <Text style={styles.signupText}>Đăng ký</Text>
        </LinearGradient>
      </Pressable>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.or}>Hoặc</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialContainer}>
        <Ionicons name='logo-google' size={32} color='#ea435' />
        <Ionicons name="logo-facebook" size={32} color="#1877f2" style={{ marginLeft: 24 }} />
      </View>

      <Text style={styles.loginText}>
        Tôi đã có tài khoản{' '}
        <Text style={styles.loginLink} onPress={() => navigation.replace('Login')}>Đăng nhập</Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  image: {
    width: '100%',
    height: '29%'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    marginBottom: 20
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  inputWrapper: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8b8b8b',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 12
  },
  inputFocused: {
    borderColor: '#009245'
  },
  signupButton: {
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  or: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#888',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400'
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '400',
    color: '#009245'
  }
});