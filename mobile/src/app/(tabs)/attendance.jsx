import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  QrCode, 
  Camera,
  Download,
  Filter,
  Search
} from 'lucide-react-native';

export default function AttendanceScreen() {
  const insets = useSafeAreaInsets();
  const [user] = useState(global.currentUser || { role: 'student', name: 'John Doe' });
  const [selectedFilter, setSelectedFilter] = useState('all');

  const attendanceData = [
    {
      id: 1,
      subject: 'Mathematics',
      date: '2024-01-15',
      time: '9:00 AM',
      status: 'present',
      room: 'Room 101',
      faculty: 'Dr. Smith'
    },
    {
      id: 2,
      subject: 'Physics',
      date: '2024-01-15',
      time: '11:00 AM',
      status: 'present',
      room: 'Lab 2',
      faculty: 'Prof. Johnson'
    },
    {
      id: 3,
      subject: 'Computer Science',
      date: '2024-01-14',
      time: '2:00 PM',
      status: 'absent',
      room: 'Room 205',
      faculty: 'Dr. Wilson'
    },
    {
      id: 4,
      subject: 'English',
      date: '2024-01-14',
      time: '4:00 PM',
      status: 'present',
      room: 'Room 301',
      faculty: 'Ms. Davis'
    },
    {
      id: 5,
      subject: 'Mathematics',
      date: '2024-01-13',
      time: '9:00 AM',
      status: 'late',
      room: 'Room 101',
      faculty: 'Dr. Smith'
    },
  ];

  const subjectStats = [
    { subject: 'Mathematics', present: 18, total: 20, percentage: 90 },
    { subject: 'Physics', present: 16, total: 18, percentage: 89 },
    { subject: 'Computer Science', present: 14, total: 17, percentage: 82 },
    { subject: 'English', present: 19, total: 20, percentage: 95 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#10B981';
      case 'absent': return '#EF4444';
      case 'late': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return CheckCircle;
      case 'absent': return XCircle;
      case 'late': return Clock;
      default: return Clock;
    }
  };

  const filteredData = selectedFilter === 'all' 
    ? attendanceData 
    : attendanceData.filter(item => item.status === selectedFilter);

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
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
              My Attendance
            </Text>
            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
              Track your class attendance
            </Text>
          </View>
          <TouchableOpacity 
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              padding: 12,
            }}
            onPress={() => {/* Download report */}}
          >
            <Download size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 24, marginTop: -20 }}>
          <View style={{
            flexDirection: 'row',
            gap: 12,
            marginBottom: 24,
          }}>
            <TouchableOpacity
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
              onPress={() => router.push('/attendance/scan')}
            >
              <View style={{
                width: 48,
                height: 48,
                backgroundColor: '#10B98115',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <QrCode size={24} color="#10B981" />
              </View>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#374151',
                textAlign: 'center',
              }}>
                Scan QR Code
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
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
              onPress={() => router.push('/attendance/face')}
            >
              <View style={{
                width: 48,
                height: 48,
                backgroundColor: '#3B82F615',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <Camera size={24} color="#3B82F6" />
              </View>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#374151',
                textAlign: 'center',
              }}>
                Face Check-in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subject-wise Stats */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>
            Subject-wise Attendance
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
            {subjectStats.map((stat, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: index < subjectStats.length - 1 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: 4,
                  }}>
                    {stat.subject}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280',
                  }}>
                    {stat.present}/{stat.total} classes
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: stat.percentage >= 85 ? '#10B981' : stat.percentage >= 75 ? '#F59E0B' : '#EF4444',
                    marginBottom: 2,
                  }}>
                    {stat.percentage}%
                  </Text>
                  <View style={{
                    width: 60,
                    height: 4,
                    backgroundColor: '#E5E7EB',
                    borderRadius: 2,
                  }}>
                    <View style={{
                      width: `${stat.percentage}%`,
                      height: '100%',
                      backgroundColor: stat.percentage >= 85 ? '#10B981' : stat.percentage >= 75 ? '#F59E0B' : '#EF4444',
                      borderRadius: 2,
                    }} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={{ paddingHorizontal: 24, marginBottom: 20 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>
            Attendance History
          </Text>
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#E5E7EB',
            borderRadius: 12,
            padding: 4,
            marginBottom: 16,
          }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'present', label: 'Present' },
              { id: 'absent', label: 'Absent' },
              { id: 'late', label: 'Late' },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  borderRadius: 8,
                  backgroundColor: selectedFilter === filter.id ? '#3B82F6' : 'transparent',
                }}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 12,
                  color: selectedFilter === filter.id ? '#fff' : '#6B7280',
                }}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Attendance List */}
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            {filteredData.map((item, index) => {
              const StatusIcon = getStatusIcon(item.status);
              return (
                <View
                  key={item.id}
                  style={{
                    padding: 20,
                    borderBottomWidth: index < filteredData.length - 1 ? 1 : 0,
                    borderBottomColor: '#F3F4F6',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      backgroundColor: `${getStatusColor(item.status)}15`,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 16,
                    }}>
                      <StatusIcon size={20} color={getStatusColor(item.status)} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: 4,
                      }}>
                        {item.subject}
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: '#6B7280',
                        marginBottom: 2,
                      }}>
                        {item.date} • {item.time}
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: '#6B7280',
                      }}>
                        {item.room} • {item.faculty}
                      </Text>
                    </View>
                    <View style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 12,
                      backgroundColor: `${getStatusColor(item.status)}15`,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: getStatusColor(item.status),
                      }}>
                        {item.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}