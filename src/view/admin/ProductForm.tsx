import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  isNewArrival: boolean;
};
type ProductFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Product>) => void;
  initialData?: Product | null;
};

const COLORS = {
  primary: '#1e88e5',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  border: '#e0e0e0',
};

export default function ProductForm({
  visible,
  onClose,
  onSubmit,
  initialData,
}: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isNewArrival, setIsNewArrival] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setDescription(initialData.description);
      setImage(initialData.image);
      setIsNewArrival(initialData.isNewArrival);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!name || !price || !description || !image) {
      Alert.alert('Please fill in all fields');
      return;
    }

    onSubmit({
      name,
      price,
      description,
      image,
      isNewArrival,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {initialData ? 'Edit Product' : 'Add New Product'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          <View style={styles.switchContainer}>
            <Text>New Arrival</Text>
            <Switch value={isNewArrival} onValueChange={setIsNewArrival} />
          </View>

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
  },
  textArea: {
    height: scale(100),
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
