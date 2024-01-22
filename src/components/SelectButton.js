import React, { useState } from "react";
import { Button } from "@ui-kitten/components"; // Replace with your button component import

const SelectButton = ({ onPress, value }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress(value, isSelected); // Call the onPress function with value and isSelected as arguments
  };

  return (
    <Button
      size="tiny"
      onPress={handlePress}
      style={{ borderRadius: 20 }}
      status={isSelected ? "info" : "basic"}
    >
      {isSelected ? "Selected" : "Select"}
    </Button>
  );
};

export default SelectButton;
