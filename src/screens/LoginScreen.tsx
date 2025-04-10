import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadUser = async () => {
      const saved = await AsyncStorage.getItem('userInfo');
      if (saved) {
        const user = JSON.parse(saved);
        setEmail(user.email);
        setPassword(user.password);
        setRememberMe(true);
      }
    };
    loadUser();
  }, []);

  const handleLogin = async () => {
    const result = await loginUser(email, password);

    if (result.length > 0) {
      // Lưu thông tin người dùng vào AsyncStorage nếu có check "Nhớ tài khoản"
      if (rememberMe) {
        await AsyncStorage.setItem('userInfo', JSON.stringify(result[0]));
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }]
      });
    } else {
      setLoginError('Sai email hoặc mật khẩu. Thử lại');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/bg/ellipse1.png')} />

      <Text style={styles.title}>Chào mừng bạn</Text>
      <Text style={styles.subtitle}>Đăng nhập tài khoản</Text>

      {/* Email */}
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

      {/* Mật khẩu */}
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
      {!!loginError && <Text style={styles.error}>{loginError}</Text>}

      {/* Nhớ tài khoản & Quên mật khẩu */}
      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
        <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
          <Ionicons
            name={rememberMe ? 'checkbox' : 'square-outline'}
            size={22}
            color="#007537"
          />
          <Text style={styles.rememberText}>Nhớ tài khoản</Text>
        </Pressable>
        </View>
        <Text style={styles.forgotText}>Quên mật khẩu ?</Text>
      </View>

      {/* Đăng nhập */}
      <Pressable style={{ width: '80%' }} onPress={handleLogin}>
        <LinearGradient
          colors={[ '#007357', '#4caf50' ]}
          style={styles.loginButton}
          start={[0, 0]}
          end={[1, 0]}
        >
          <Text style={styles.loginText}>Đăng nhập</Text>
        </LinearGradient>
      </Pressable>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.or}>Hoặc</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialContainer}>
        <Ionicons name='logo-google' size={32} color='#ea435' />
        <Ionicons name="logo-facebook" size={32} color="#1877f2" style={{ marginLeft: 24 }} />
      </View>

      <Text style={styles.signupText}>
        Bạn không có tài khoản?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Register')}>Tạo tài khoản</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  image: {
    width: '100%',
    height: '40%',
    marginBottom: 10
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
  error: {
    color: '#ce0000',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignContent: 'center'
  },
  rememberText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#949090',
    marginLeft: 8,
    textAlign: 'center',
    alignContent: 'flex-end'
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#009245'
  },
  loginButton: {
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginText: {
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
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400'
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '400',
    color: '#009245'
  }
});