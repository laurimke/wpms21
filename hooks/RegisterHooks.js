import {useState} from 'react';
import {useUser} from './ApiHooks';
import {validator} from '../utils/validator';

const constraints = {
  username: {
    presence: true,
    length: {
      minimum: 3,
      message: 'Must be atleast 3 characters',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'Must be atleast 6 characters',
    },
  },
  email: {
    presence: true,
    email: true,
  },
  full_name: {
    length: {
      minimum: 3,
      message: 'Must be atleast 3 characters',
    },
  },
  confirmPassword: {
    equality: 'password',
  },
};

const useSignUpForm = (callback) => {
  const {checkUsernameAvailable} = useUser();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, text) => {
    console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const handleOnEndEditing = (name, text) => {
    let error;
    if (name === 'confirmPassword') {
      error = validator(
        name,
        {password: inputs.password, confirmPassword: text},
        constraints
      );
    } else {
      error = validator(name, text, constraints);
    }
    // 1.validate inputvalue
    error = validator(name, text, constraints);
    // 2. Update error state
    setErrors((errors) => {
      return {
        ...errors,
        [name]: error,
      };
    });
  };

  const checkUsername = async (username) => {
    if (username.length < 3) {
      return;
    }
    try {
      const isAvailable = await checkUsernameAvailable(username);
      console.log('checkusername availabile', isAvailable);
      if (!isAvailable) {
        setErrors((errors) => {
          return {...errors, username: 'username already exists'};
        });
      }
    } catch (error) {
      console.log('username check failed', error);
    }
  };
  return {
    handleInputChange,
    handleOnEndEditing,
    inputs,
    errors,
    checkUsername,
  };
};

export default useSignUpForm;
