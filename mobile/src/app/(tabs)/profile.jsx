import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen,
  Settings,
  Bell,
  Shield,
  LogOut,
  Edit3,
  Save,
  X
} from 'lucide-react-native';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [user] = useState(global.currentUser || { 
    role: 'student', 
    name: 'John Doe',
    email: 'john.doe@college.edu',
    phone: '+1 (555) 123-4567',
    studentId: 'STU2024001',
    department: 'Computer Science',
    year: '3rd Year',
    address: '123 College Street, University City'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    // In a real app, this would update the user data via API
    global.currentUser = editedUser;
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            global.currentUser = null;
            router.replace('/login');
          }
        }
      ]
    );
  };

  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Full Name', value: editedUser.name, key: 'name', icon: User, editable: true },
        { label: 'Email', value: editedUser.email, key: 'email', icon: Mail, editable: true },
        { label: 'Phone', value: editedUser.phone, key: 'phone', icon: Phone, editable: true },
        { label: 'Address', value: editedUser.address, key: 'address', icon: MapPin, editable: true },
      ]
    },
    {
      title: 'Academic Information',
      items: [
        { label: 'Student ID', value: editedUser.studentId, key: 'studentId', icon: BookOpen, editable: false },
        { label: 'Department', value: editedUser.department, key: 'department', icon: BookOpen, editable: false },
        { label: 'Year', value: editedUser.year, key: 'year', icon: Calendar, editable: false },
      ]
    }
  ];

  const settingsOptions = [
    { label: 'Notifications', icon: Bell, action: () => router.push('/settings/notifications') },
    { label: 'Privacy & Security', icon: Shield, action: () => router.push('/settings/privacy') },
    { label: 'App Settings', icon: Settings, action: () => router.push('/settings/app') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 24,
        paddingBottom: 30,
        backgroundColor: '#10B981',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
              Profile
            </Text>
            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
              Manage your account settings
            </Text>
          </View>
          <TouchableOpacity 
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              padding: 12,
            }}
            onPress={() => {
              if (isEditing) {
                setEditedUser(user);
                setIsEditing(false);
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? (
              <X size={20} color="#fff" />
            ) : (
              <Edit3 size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={{ paddingHorizontal: 24, marginTop: -20 }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 24,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            marginBottom: 24,
          }}>
            <View style={{
              width: 80,
              height: 80,
              backgroundColor: '#10B98115',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <User size={40} color="#10B981" />
            </View>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: 4,
            }}>
              {user.name}
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#6B7280',
              marginBottom: 8,
            }}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Text>
            <View style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#10B98115',
              borderRadius: 20,
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#10B981',
              }}>
                {user.studentId}
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Information */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={{ paddingHorizontal: 24, marginBottom: 24 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: 16,
            }}>
              {section.title}
            </Text>
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              {section.items.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                    borderBottomWidth: index < section.items.length - 1 ? 1 : 0,
                    borderBottomColor: '#F3F4F6',
                  }}
                >
                  <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#10B98115',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 16,
                  }}>
                    <item.icon size={20} color="#10B981" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 14,
                      color: '#6B7280',
                      marginBottom: 4,
                    }}>
                      {item.label}
                    </Text>
                    {isEditing && item.editable ? (
                      <TextInput
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          color: '#374151',
                          borderBottomWidth: 1,
                          borderBottomColor: '#E5E7EB',
                          paddingVertical: 4,
                        }}
                        value={editedUser[item.key]}
                        onChangeText={(text) => setEditedUser({ ...editedUser, [item.key]: text })}
                        placeholder={item.label}
                      />
                    ) : (
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#374151',
                      }}>
                        {item.value}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Save Button (only show when editing) */}
        {isEditing && (
          <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#10B981',
                borderRadius: 12,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleSave}
            >
              <Save size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
              }}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Settings */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>
            Settings
          </Text>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            {settingsOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20,
                  borderBottomWidth: index < settingsOptions.length - 1 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                }}
                onPress={option.action}
              >
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#6B728015',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16,
                }}>
                  <option.icon size={20} color="#6B7280" />
                </View>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#374151',
                  flex: 1,
                }}>
                  {option.label}
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#6B7280',
                }}>
                  ›
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={{ paddingHorizontal: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#EF4444',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
            onPress={handleLogout}
          >
            <LogOut size={20} color="#EF4444" style={{ marginRight: 8 }} />
            <Text style={{
              color: '#EF4444',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}