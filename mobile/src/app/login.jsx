import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
    name: '',
    studentId: '',
  });

  const roles = [
    { id: 'student', label: 'Student', color: '#3B82F6' },
    { id: 'faculty', label: 'Faculty', color: '#10B981' },
    { id: 'admin', label: 'Admin', color: '#F59E0B' },
  ];

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Simulate login - in real app, this would call an API
    const mockUser = {
      id: '1',
      email: formData.email,
      role: formData.role,
      name: formData.name || 'John Doe',
    };

    // Store user data (in real app, use secure storage)
    global.currentUser = mockUser;
    
    router.replace('/(tabs)');
  };

  const handleRegister = () => {
    if (!formData.email || !formData.password || !formData.name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert('Success', 'Account created successfully!', [
      { text: 'OK', onPress: () => setIsLogin(true) }
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 24,
        paddingBottom: 40,
        backgroundColor: '#3B82F6',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <GraduationCap size={40} color="#fff" />
          </View>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}>
            Attendance System
          </Text>
          <Text style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            marginTop: 8,
          }}>
            Smart monitoring for modern education
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }}>
        {/* Toggle Login/Register */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#E5E7EB',
          borderRadius: 12,
          padding: 4,
          marginBottom: 32,
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 8,
              backgroundColor: isLogin ? '#3B82F6' : 'transparent',
            }}
            onPress={() => setIsLogin(true)}
          >
            <Text style={{
              textAlign: 'center',
              fontWeight: '600',
              color: isLogin ? '#fff' : '#6B7280',
            }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 8,
              backgroundColor: !isLogin ? '#3B82F6' : 'transparent',
            }}
            onPress={() => setIsLogin(false)}
          >
            <Text style={{
              textAlign: 'center',
              fontWeight: '600',
              color: !isLogin ? '#fff' : '#6B7280',
            }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* Role Selection */}
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#374151',
          marginBottom: 12,
        }}>
          Select Role
        </Text>
        <View style={{
          flexDirection: 'row',
          marginBottom: 24,
          gap: 12,
        }}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: formData.role === role.id ? role.color : '#E5E7EB',
                backgroundColor: formData.role === role.id ? `${role.color}10` : '#fff',
              }}
              onPress={() => setFormData({ ...formData, role: role.id })}
            >
              <Text style={{
                textAlign: 'center',
                fontWeight: '600',
                color: formData.role === role.id ? role.color : '#6B7280',
                fontSize: 14,
              }}>
                {role.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Form Fields */}
        {!isLogin && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#374151',
              marginBottom: 8,
            }}>
              Full Name
            </Text>
            <TextInput
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                fontSize: 16,
              }}
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>
        )}

        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#374151',
            marginBottom: 8,
          }}>
            Email Address
          </Text>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Mail size={20} color="#6B7280" style={{ marginRight: 12 }} />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#374151',
            marginBottom: 8,
          }}>
            Password
          </Text>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Lock size={20} color="#6B7280" style={{ marginRight: 12 }} />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#3B82F6',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginBottom: 20,
          }}
          onPress={isLogin ? handleLogin : handleRegister}
        >
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}>
            {isLogin ? 'Login' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Demo Credentials */}
        <View style={{
          backgroundColor: '#F3F4F6',
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}>
          <Text style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#374151',
            marginBottom: 8,
          }}>
            Demo Credentials:
          </Text>
          <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>
            Student: student@demo.com / password
          </Text>
          <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>
            Faculty: faculty@demo.com / password
          </Text>
          <Text style={{ fontSize: 12, color: '#6B7280' }}>
            Admin: admin@demo.com / password
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}