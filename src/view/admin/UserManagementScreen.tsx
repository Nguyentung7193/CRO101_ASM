import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import {scale, moderateScale} from 'react-native-size-matters';
import UserForm from './UserForm';

const BASE_URL = 'http://localhost:3000';

type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
  createdAt: string;
};

const COLORS = {
  primary: '#1e88e5',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  text: '#333333',
  error: '#ff4444',
};

export default function UserManagementScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<User, 'id'>) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, {
        ...data,
        createdAt: new Date().toISOString(),
      });
      setUsers([...users, response.data]);
      setShowForm(false);
      Alert.alert('Success', 'User created successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to create user');
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, data: Partial<User>) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${id}`, data);
      setUsers(users.map(u => (u.id === id ? response.data : u)));
      setEditingUser(null);
      setShowForm(false);
      Alert.alert('Success', 'User updated successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to update user');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/users/${id}`);
              setUsers(users.filter(u => u.id !== id));
              Alert.alert('Success', 'User deleted successfully');
            } catch (err) {
              Alert.alert('Error', 'Failed to delete user');
              console.error(err);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditingUser(null);
            setShowForm(true);
          }}>
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        renderItem={({item}) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name || 'No Name'}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
              <Text style={styles.userDate}>
                Created: {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setEditingUser(item);
                  setShowForm(true);
                }}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {showForm && (
        <UserForm
          visible={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
          onSubmit={data =>
            editingUser
              ? handleUpdate(editingUser.id, data)
              : handleCreate(data as Omit<User, 'id'>)
          }
          initialData={editingUser}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: scale(8),
    borderRadius: scale(8),
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '500',
  },
  list: {
    padding: scale(16),
  },
  userItem: {
    flexDirection: 'row',
    padding: scale(16),
    backgroundColor: COLORS.white,
    borderRadius: scale(8),
    marginBottom: scale(8),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    justifyContent: 'space-between',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: moderateScale(14),
    color: COLORS.primary,
    marginVertical: scale(4),
  },
  userDate: {
    fontSize: moderateScale(12),
    color: COLORS.lightGray,
  },
  actions: {
    justifyContent: 'center',
    gap: scale(8),
  },
  editButton: {
    backgroundColor: COLORS.primary,
    padding: scale(8),
    borderRadius: scale(4),
  },
  deleteButton: {
    backgroundColor: COLORS.error,
    padding: scale(8),
    borderRadius: scale(4),
  },
  buttonText: {
    color: COLORS.white,
    fontSize: moderateScale(12),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: moderateScale(16),
  },
});
