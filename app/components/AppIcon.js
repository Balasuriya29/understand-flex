import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppIcon({
  name,
  size = 24,
  backgroundColor = "black",
  iconColor = "white",
  style,
}) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <MaterialCommunityIcons name={name} size={size * 0.5} color={iconColor} />
    </View>
  );
}

export default AppIcon;
