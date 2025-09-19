import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LineGraph } from 'react-native-graph';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Users, 
  BookOpen,
  BarChart3,
  PieChart,
  Download
} from 'lucide-react-native';

export default function AnalyticsScreen() {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;
  const graphWidth = windowWidth - 48; // Account for padding
  const [user] = useState(global.currentUser || { role: 'student', name: 'John Doe' });
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Sample attendance data for graphs
  const weeklyAttendance = [
    { date: new Date('2024-01-08'), value: 85 },
    { date: new Date('2024-01-09'), value: 90 },
    { date: new Date('2024-01-10'), value: 78 },
    { date: new Date('2024-01-11'), value: 92 },
    { date: new Date('2024-01-12'), value: 88 },
    { date: new Date('2024-01-13'), value: 95 },
    { date: new Date('2024-01-14'), value: 82 },
  ];

  const monthlyAttendance = [
    { date: new Date('2024-01-01'), value: 88 },
    { date: new Date('2024-02-01'), value: 85 },
    { date: new Date('2024-03-01'), value: 92 },
    { date: new Date('2024-04-01'), value: 87 },
    { date: new Date('2024-05-01'), value: 90 },
    { date: new Date('2024-06-01'), value: 84 },
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', attendance: 90, trend: 'up', change: '+5%' },
    { subject: 'Physics', attendance: 89, trend: 'up', change: '+2%' },
    { subject: 'Computer Science', attendance: 82, trend: 'down', change: '-3%' },
    { subject: 'English', attendance: 95, trend: 'up', change: '+8%' },
  ];

  const getAnalyticsForRole = () => {
    switch (user.role) {
      case 'faculty':
        return {
          title: 'Class Analytics',
          subtitle: 'Monitor your class performance',
          stats: [
            { label: 'Avg Attendance', value: '84%', change: '+2.5%', trend: 'up' },
            { label: 'Active Students', value: '240', change: '+12', trend: 'up' },
            { label: 'Classes This Week', value: '18', change: '+3', trend: 'up' },
            { label: 'Completion Rate', value: '96%', change: '+1.2%', trend: 'up' },
          ]
        };
      case 'admin':
        return {
          title: 'System Analytics',
          subtitle: 'College-wide performance metrics',
          stats: [
            { label: 'Overall Attendance', value: '84%', change: '+1.8%', trend: 'up' },
            { label: 'Total Students', value: '1,250', change: '+45', trend: 'up' },
            { label: 'Active Faculty', value: '45', change: '+2', trend: 'up' },
            { label: 'System Uptime', value: '99.8%', change: '+0.1%', trend: 'up' },
          ]
        };
      default:
        return {
          title: 'My Analytics',
          subtitle: 'Track your attendance progress',
          stats: [
            { label: 'Overall Rate', value: '87%', change: '+3.2%', trend: 'up' },
            { label: 'This Week', value: '92%', change: '+5%', trend: 'up' },
            { label: 'Classes Attended', value: '156', change: '+8', trend: 'up' },
            { label: 'Perfect Days', value: '12', change: '+2', trend: 'up' },
          ]
        };
    }
  };

  const analytics = getAnalyticsForRole();
  const graphData = selectedPeriod === 'week' ? weeklyAttendance : monthlyAttendance;

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 24,
        paddingBottom: 30,
        backgroundColor: '#8B5CF6',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
              {analytics.title}
            </Text>
            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
              {analytics.subtitle}
            </Text>
          </View>
          <TouchableOpacity 
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              padding: 12,
            }}
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
        {/* Stats Grid */}
        <View style={{ paddingHorizontal: 24, marginTop: -20 }}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 32,
          }}>
            {analytics.stats.map((stat, index) => (
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
                  marginBottom: 8,
                }}>
                  {stat.label}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {stat.trend === 'up' ? (
                    <TrendingUp size={16} color="#10B981" />
                  ) : (
                    <TrendingDown size={16} color="#EF4444" />
                  )}
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: stat.trend === 'up' ? '#10B981' : '#EF4444',
                    marginLeft: 4,
                  }}>
                    {stat.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Attendance Trend Chart */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1F2937',
            }}>
              Attendance Trend
            </Text>
            <View style={{
              flexDirection: 'row',
              backgroundColor: '#E5E7EB',
              borderRadius: 8,
              padding: 2,
            }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  backgroundColor: selectedPeriod === 'week' ? '#8B5CF6' : 'transparent',
                }}
                onPress={() => setSelectedPeriod('week')}
              >
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: selectedPeriod === 'week' ? '#fff' : '#6B7280',
                }}>
                  Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  backgroundColor: selectedPeriod === 'month' ? '#8B5CF6' : 'transparent',
                }}
                onPress={() => setSelectedPeriod('month')}
              >
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: selectedPeriod === 'month' ? '#fff' : '#6B7280',
                }}>
                  Month
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
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
            <LineGraph
              points={graphData}
              color="#8B5CF6"
              animated={true}
              enablePanGesture={true}
              style={{
                width: '100%',
                height: '100%',
              }}
              xLength={graphData.length}
              height={200}
              width={graphWidth - 40}
              gradientFillColors={[
                'rgba(139, 92, 246, 0.2)',
                'rgba(139, 92, 246, 0)',
              ]}
            />
          </View>
        </View>

        {/* Subject Performance */}
        {user.role === 'student' && (
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: 16,
            }}>
              Subject Performance
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
              {subjectPerformance.map((subject, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 16,
                    borderBottomWidth: index < subjectPerformance.length - 1 ? 1 : 0,
                    borderBottomColor: '#F3F4F6',
                  }}
                >
                  <View style={{
                    width: 48,
                    height: 48,
                    backgroundColor: '#8B5CF615',
                    borderRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 16,
                  }}>
                    <BookOpen size={20} color="#8B5CF6" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: 4,
                    }}>
                      {subject.subject}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: '#6B7280',
                    }}>
                      {subject.attendance}% attendance
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      {subject.trend === 'up' ? (
                        <TrendingUp size={16} color="#10B981" />
                      ) : (
                        <TrendingDown size={16} color="#EF4444" />
                      )}
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: subject.trend === 'up' ? '#10B981' : '#EF4444',
                        marginLeft: 4,
                      }}>
                        {subject.change}
                      </Text>
                    </View>
                    <View style={{
                      width: 60,
                      height: 4,
                      backgroundColor: '#E5E7EB',
                      borderRadius: 2,
                    }}>
                      <View style={{
                        width: `${subject.attendance}%`,
                        height: '100%',
                        backgroundColor: subject.attendance >= 85 ? '#10B981' : subject.attendance >= 75 ? '#F59E0B' : '#EF4444',
                        borderRadius: 2,
                      }} />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Weekly Summary */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>
            Weekly Summary
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
              { day: 'Monday', classes: 4, attended: 4, percentage: 100 },
              { day: 'Tuesday', classes: 3, attended: 3, percentage: 100 },
              { day: 'Wednesday', classes: 4, attended: 3, percentage: 75 },
              { day: 'Thursday', classes: 3, attended: 3, percentage: 100 },
              { day: 'Friday', classes: 4, attended: 4, percentage: 100 },
            ].map((day, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: index < 4 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: 2,
                  }}>
                    {day.day}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280',
                  }}>
                    {day.attended}/{day.classes} classes
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: day.percentage === 100 ? '#10B981' : day.percentage >= 75 ? '#F59E0B' : '#EF4444',
                    marginBottom: 4,
                  }}>
                    {day.percentage}%
                  </Text>
                  <View style={{
                    width: 60,
                    height: 4,
                    backgroundColor: '#E5E7EB',
                    borderRadius: 2,
                  }}>
                    <View style={{
                      width: `${day.percentage}%`,
                      height: '100%',
                      backgroundColor: day.percentage === 100 ? '#10B981' : day.percentage >= 75 ? '#F59E0B' : '#EF4444',
                      borderRadius: 2,
                    }} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Insights */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>
            Insights & Recommendations
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
              {
                title: 'Great Progress!',
                description: 'Your attendance has improved by 5% this week.',
                type: 'success'
              },
              {
                title: 'Watch Computer Science',
                description: 'Attendance dropped by 3%. Consider setting reminders.',
                type: 'warning'
              },
              {
                title: 'Perfect Week Streak',
                description: 'You\'ve had 2 perfect attendance weeks in a row!',
                type: 'success'
              },
            ].map((insight, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingVertical: 12,
                  borderBottomWidth: index < 2 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                }}
              >
                <View style={{
                  width: 32,
                  height: 32,
                  backgroundColor: insight.type === 'success' ? '#10B98115' : '#F59E0B15',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                  marginTop: 2,
                }}>
                  {insight.type === 'success' ? (
                    <TrendingUp size={16} color="#10B981" />
                  ) : (
                    <TrendingDown size={16} color="#F59E0B" />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: 4,
                  }}>
                    {insight.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280',
                    lineHeight: 16,
                  }}>
                    {insight.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}