import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  BookOpen, 
  AlertTriangle,
  CheckCircle,
  QrCode,
  Camera,
  Bell
} from 'lucide-react-native';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const [user] = useState(global.currentUser || { role: 'student', name: 'John Doe' });
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const studentStats = [
    { label: 'Attendance Rate', value: '87%', color: '#10B981', icon: TrendingUp },
    { label: 'Classes Today', value: '4', color: '#3B82F6', icon: Calendar },
    { label: 'Total Classes', value: '156', color: '#8B5CF6', icon: BookOpen },
    { label: 'Alerts', value: '2', color: '#F59E0B', icon: AlertTriangle },
  ];

  const facultyStats = [
    { label: 'Active Classes', value: '8', color: '#10B981', icon: BookOpen },
    { label: 'Students', value: '240', color: '#3B82F6', icon: Users },
    { label: 'Avg Attendance', value: '82%', color: '#8B5CF6', icon: TrendingUp },
    { label: 'Sessions Today', value: '3', color: '#F59E0B', icon: Clock },
  ];

  const adminStats = [
    { label: 'Total Students', value: '1,250', color: '#10B981', icon: Users },
    { label: 'Active Faculty', value: '45', color: '#3B82F6', icon: Users },
    { label: 'Overall Rate', value: '84%', color: '#8B5CF6', icon: TrendingUp },
    { label: 'Live Sessions', value: '12', color: '#F59E0B', icon: Clock },
  ];

  const getStatsForRole = () => {
    switch (user.role) {
      case 'faculty': return facultyStats;
      case 'admin': return adminStats;
      default: return studentStats;
    }
  };

  const getQuickActions = () => {
    switch (user.role) {
      case 'faculty':
        return [
          { label: 'Take Attendance', icon: QrCode, color: '#10B981', action: () => router.push('/faculty/take-attendance') },
          { label: 'View Reports', icon: TrendingUp, color: '#3B82F6', action: () => router.push('/analytics') },
          { label: 'Manage Classes', icon: BookOpen, color: '#8B5CF6', action: () => router.push('/faculty/classes') },
        ];
      case 'admin':
        return [
          { label: 'Manage Users', icon: Users, color: '#10B981', action: () => router.push('/admin/users') },
          { label: 'System Reports', icon: TrendingUp, color: '#3B82F6', action: () => router.push('/analytics') },
          { label: 'Settings', icon: BookOpen, color: '#8B5CF6', action: () => router.push('/admin/settings') },
        ];
      default:
        return [
          { label: 'Mark Attendance', icon: QrCode, color: '#10B981', action: () => router.push('/attendance/scan') },
          { label: 'View Schedule', icon: Calendar, color: '#3B82F6', action: () => router.push('/attendance') },
          { label: 'Face Check-in', icon: Camera, color: '#8B5CF6', action: () => router.push('/attendance/face') },
        ];
    }
  };

  const recentActivities = [
    { time: '10:30 AM', activity: 'Marked present in Mathematics', status: 'success' },
    { time: '9:15 AM', activity: 'Marked present in Physics', status: 'success' },
    { time: '8:00 AM', activity: 'Missed Computer Science', status: 'warning' },
    { time: 'Yesterday', activity: 'Completed Data Structures', status: 'success' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 24,
        paddingBottom: 30,
        backgroundColor: '#3B82F6',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>
              Good morning,
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 4 }}>
              {user.name}
            </Text>
            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </Text>
          </View>
          <TouchableOpacity style={{
            width: 48,
            height: 48,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Bell size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Grid */}
        <Animated.View style={{ 
          opacity: fadeAnim,
          paddingHorizontal: 24, 
          marginTop: -20 
        }}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            {getStatsForRole().map((stat, index) => (
              <View
                key={index}
                style={{
                  width: '47%',
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <View style={{
                  width: 48,
                  height: 48,
                  backgroundColor: `${stat.color}15`,
                  borderRadius: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <stat.icon size={24} color={stat.color} />
                </View>
                <Text style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: '#1F2937',
                  marginBottom: 4,
                }}>
                  {stat.value}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#6B7280',
                  lineHeight: 18,
                }}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {getQuickActions().map((action, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: 20,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
                onPress={action.action}
              >
                <View style={{
                  width: 48,
                  height: 48,
                  backgroundColor: `${action.color}15`,
                  borderRadius: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#374151',
                  textAlign: 'center',
                  lineHeight: 16,
                }}>
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        {user.role === 'student' && (
          <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: 16,
            }}>
              Recent Activity
            </Text>
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              {recentActivities.map((activity, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: index < recentActivities.length - 1 ? 1 : 0,
                    borderBottomColor: '#F3F4F6',
                  }}
                >
                  <View style={{
                    width: 32,
                    height: 32,
                    backgroundColor: activity.status === 'success' ? '#10B98115' : '#F59E0B15',
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}>
                    {activity.status === 'success' ? (
                      <CheckCircle size={16} color="#10B981" />
                    ) : (
                      <AlertTriangle size={16} color="#F59E0B" />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: 2,
                    }}>
                      {activity.activity}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: '#6B7280',
                    }}>
                      {activity.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Today's Schedule */}
        {user.role === 'student' && (
          <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: 16,
            }}>
              Today's Schedule
            </Text>
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              {[
                { time: '9:00 AM', subject: 'Mathematics', room: 'Room 101', status: 'completed' },
                { time: '11:00 AM', subject: 'Physics', room: 'Lab 2', status: 'current' },
                { time: '2:00 PM', subject: 'Computer Science', room: 'Room 205', status: 'upcoming' },
                { time: '4:00 PM', subject: 'English', room: 'Room 301', status: 'upcoming' },
              ].map((class_, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: index < 3 ? 1 : 0,
                    borderBottomColor: '#F3F4F6',
                  }}
                >
                  <View style={{
                    width: 4,
                    height: 40,
                    backgroundColor: class_.status === 'current' ? '#3B82F6' : 
                                   class_.status === 'completed' ? '#10B981' : '#E5E7EB',
                    borderRadius: 2,
                    marginRight: 16,
                  }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: 2,
                    }}>
                      {class_.subject}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: '#6B7280',
                    }}>
                      {class_.time} • {class_.room}
                    </Text>
                  </View>
                  <View style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    backgroundColor: class_.status === 'current' ? '#3B82F615' : 
                                   class_.status === 'completed' ? '#10B98115' : '#F3F4F6',
                  }}>
                    <Text style={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: class_.status === 'current' ? '#3B82F6' : 
                            class_.status === 'completed' ? '#10B981' : '#6B7280',
                    }}>
                      {class_.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}