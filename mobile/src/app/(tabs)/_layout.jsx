import { Tabs } from "expo-router";
import { Home, User, BarChart3, Calendar, Settings } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          paddingTop: 4,
          height: 80,
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          href: null, // Hidden from tab bar, accessible via navigation
        }}
      />
      <Tabs.Screen
        name="faculty"
        options={{
          href: null, // Hidden from tab bar, accessible via navigation
        }}
      />
    </Tabs>
  );
}
