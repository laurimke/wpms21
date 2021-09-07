import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {Card, Button} from 'react-native-elements';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {checkToken} = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState(true);
  // console.log('Login isLoggedIn', isLoggedIn);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('logIn asyncstorage token:', userToken);
    if (userToken) {
      const userInfo = await checkToken(userToken);
      if (userInfo.user_id) {
        setUser(userInfo);
        setIsLoggedIn(true);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {registerFormToggle ? (
        <Card>
          <Card.Divider />
          <Card.Title h4>Register</Card.Title>
          <RegisterForm navigation={navigation} />
          {/*
          <Button
            title={'Already registered? Login here'}
            onPress={setRegisterFormToggle(!registerFormToggle)}
          />
          */}
        </Card>
      ) : (
        <Card>
          <Card.Title h4>Login</Card.Title>
          <LoginForm navigation={navigation} />
          {/*
          <Button
            title={'No account? Register here'}
            onPress={setRegisterFormToggle(!registerFormToggle)}
          />
         */}
        </Card>
      )}
      <Button
        type="clear"
        title={
          registerFormToggle
            ? 'No account yet? Register here'
            : 'Already registered? Login here'
        }
        onPress={() => {
          setRegisterFormToggle(!registerFormToggle);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
