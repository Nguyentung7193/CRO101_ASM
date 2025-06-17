import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

type UserFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {email: string; password: string; name?: string}) => void;
  initialData?: {
    email: string;
    password: string;
    name?: string;
  } | null;
};

const COLORS = {
  primary: '#1e88e5',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  border: '#e0e0e0',
};

export default function UserForm({
  visible,
  onClose,
  onSubmit,
  initialData,
}: UserFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData) {
      setEmail(initialData.email);
      setName(initialData.name || '');
      setPassword(''); // Don't set password for security
    } else {
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!email || (!initialData && !password)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Always provide a password string (empty string if not updating password)
    const data: {email: string; password: string; name?: string} = {
      email,
      password: password ?? '',
      ...(name ? {name} : {}),
    };

    onSubmit(data);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {initialData ? 'Edit User' : 'Add New User'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Name (Optional)"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder={initialData ? 'New Password (Optional)' : 'Password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>
                {initialData ? 'Update' : 'Create'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(20),
    elevation: 5,
  },
  modalTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: scale(20),
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(8),
    padding: scale(12),
    marginBottom: scale(16),
    fontSize: moderateScale(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
  },
  cancelButton: {
    flex: 1,
    padding: scale(12),
    marginRight: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  submitButton: {
    flex: 1,
    padding: scale(12),
    backgroundColor: COLORS.primary,
    borderRadius: scale(8),
  },
  cancelButtonText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
  submitButtonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
});
