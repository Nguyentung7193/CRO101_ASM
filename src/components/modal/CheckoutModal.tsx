import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

type CheckoutModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: CheckoutFormData) => void;
  totalAmount: number;
};

export type CheckoutFormData = {
  shippingAddress: string;
  phoneNumber: string;
};

const COLORS = {
  primary: '#1e88e5',
  secondary: '#64b5f6',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  textSecondary: '#757575',
};

export default function CheckoutModal({
  visible,
  onClose,
  onSubmit,
  totalAmount,
}: CheckoutModalProps) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    if (!shippingAddress || !phoneNumber) {
      Alert.alert('Please fill in all fields');
      return;
    }
    onSubmit({
      shippingAddress,
      phoneNumber,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Complete Your Order</Text>
          <Text style={styles.totalAmount}>
            Total Amount: ${totalAmount.toFixed(2)}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Shipping Address"
            value={shippingAddress}
            onChangeText={setShippingAddress}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Place Order</Text>
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
    color: COLORS.text,
    marginBottom: scale(10),
  },
  totalAmount: {
    fontSize: moderateScale(18),
    color: COLORS.primary,
    marginBottom: scale(20),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
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