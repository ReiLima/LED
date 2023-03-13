import React, { useState } from "react";
import {
  Text
} from "react-native";

const ProfileScreen = ({ navigation, route }) => {
    return (
      <Text>This is {route.params.nome}'s profile</Text>
    );
  };

  export default ProfileScreen;