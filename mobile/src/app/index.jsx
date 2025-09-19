import { Redirect } from "expo-router";
import { useUser } from "@/utils/auth/useUser";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
