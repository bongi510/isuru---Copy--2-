import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import {
  Button,
  Layout,
  Radio,
  RadioGroup,
  Input,
} from "@ui-kitten/components";
import Screen from "../../components/Screen";

export default function ({ navigation, route }) {
  const { name, nickName, dob, gender, phoneNumber, type, profilePicture } =
    route.params;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const cities = [
    {
      city: "Colombo",
      lat: "6.9344",
      lng: "79.8428",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "success",
      population: "2323826",
      population_proper: "752993",
    },
    {
      city: "Mount Lavinia",
      lat: "6.8731",
      lng: "79.8758",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "245974",
      population_proper: "245974",
    },
    {
      city: "Kesbewa",
      lat: "6.7953",
      lng: "79.9386",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "243842",
      population_proper: "243842",
    },
    {
      city: "Moratuwa",
      lat: "6.7991",
      lng: "79.8767",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "200000",
      population_proper: "168280",
    },
    {
      city: "Maharagama",
      lat: "6.8494",
      lng: "79.9236",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "195355",
      population_proper: "195355",
    },
    {
      city: "Ratnapura",
      lat: "6.6806",
      lng: "80.4022",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Sabaragamuwa",
      capital: "admin",
      population: "165998",
      population_proper: "165998",
    },
    {
      city: "Kandy",
      lat: "7.2964",
      lng: "80.6350",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Central",
      capital: "admin",
      population: "161000",
      population_proper: "120087",
    },
    {
      city: "Negombo",
      lat: "7.2111",
      lng: "79.8386",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "142136",
      population_proper: "142136",
    },
    {
      city: "Sri Jayewardenepura Kotte",
      lat: "6.9108",
      lng: "79.8878",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "success",
      population: "115826",
      population_proper: "115826",
    },
    {
      city: "Kalmunai",
      lat: "7.4167",
      lng: "81.8167",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Eastern",
      capital: "",
      population: "106780",
      population_proper: "106780",
    },
    {
      city: "Trincomalee",
      lat: "8.5667",
      lng: "81.2333",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Eastern",
      capital: "admin",
      population: "99135",
      population_proper: "99135",
    },
    {
      city: "Galle",
      lat: "6.0536",
      lng: "80.2117",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Southern",
      capital: "admin",
      population: "93118",
      population_proper: "93118",
    },
    {
      city: "Jaffna",
      lat: "9.6647",
      lng: "80.0167",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "North Central",
      capital: "admin",
      population: "88138",
      population_proper: "88138",
    },
    {
      city: "Athurugiriya",
      lat: "6.8922",
      lng: "79.9428",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "84278",
      population_proper: "84278",
    },
    {
      city: "Weligama",
      lat: "5.9739",
      lng: "80.4294",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Southern",
      capital: "",
      population: "72511",
      population_proper: "72511",
    },
    {
      city: "Matara",
      lat: "5.9500",
      lng: "80.5333",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Southern",
      capital: "",
      population: "68244",
      population_proper: "68244",
    },
    {
      city: "Kolonnawa",
      lat: "6.9283",
      lng: "79.8950",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "64887",
      population_proper: "64887",
    },
    {
      city: "Gampaha",
      lat: "7.0917",
      lng: "79.9997",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "62797",
      population_proper: "62797",
    },
    {
      city: "Puttalam",
      lat: "8.0330",
      lng: "79.8260",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "North Western",
      capital: "",
      population: "45661",
      population_proper: "45661",
    },
    {
      city: "Badulla",
      lat: "6.9847",
      lng: "81.0564",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Uva",
      capital: "admin",
      population: "42923",
      population_proper: "42923",
    },
    {
      city: "Kalutara",
      lat: "6.5869",
      lng: "79.9603",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "37081",
      population_proper: "37081",
    },
    {
      city: "Bentota",
      lat: "6.4200",
      lng: "80.0000",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Southern",
      capital: "",
      population: "37000",
      population_proper: "37000",
    },
    {
      city: "Matale",
      lat: "7.4667",
      lng: "80.6167",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Central",
      capital: "",
      population: "36451",
      population_proper: "36451",
    },
    {
      city: "Mannar",
      lat: "8.9772",
      lng: "79.9138",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "North Central",
      capital: "",
      population: "35000",
      population_proper: "35000",
    },
    {
      city: "Pothuhera",
      lat: "7.4199",
      lng: "80.3274",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "North Western",
      capital: "",
      population: "30315",
      population_proper: "30315",
    },
    {
      city: "Kurunegala",
      lat: "7.4833",
      lng: "80.3667",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "North Western",
      capital: "admin",
      population: "30315",
      population_proper: "30315",
    },
    {
      city: "Mabole",
      lat: "7.0000",
      lng: "79.9000",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "29880",
      population_proper: "29880",
    },
    {
      city: "Hatton",
      lat: "6.8897",
      lng: "80.5981",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Central",
      capital: "",
      population: "15073",
      population_proper: "15073",
    },
    {
      city: "Hambantota",
      lat: "6.1244",
      lng: "81.1225",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Southern",
      capital: "",
      population: "11213",
      population_proper: "11213",
    },
    {
      city: "Oruwala",
      lat: "6.8903",
      lng: "79.9963",
      country: "Sri Lanka",
      iso2: "LK",
      admin_name: "Western",
      capital: "",
      population: "4501",
      population_proper: "4501",
    },
  ];

  const filteredCities = cities.filter((city) =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    const selectedCity = cities[selectedIndex];
    if (type === 0) {
      navigation.navigate("SelectExp", {
        name,
        nickName,
        dob,
        gender,
        phoneNumber,
        type,
        city: selectedCity,
        profilePicture,
      });
    } else if (type === 1) {
      navigation.navigate("Register", {
        name,
        nickName,
        dob,
        gender,
        phoneNumber,
        type,
        city: selectedCity,
        expertise: "",
        profilePicture,
      });
    }
  };
  console.log(route.params);
  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Register"}
    >
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "left",
          padding: 10,
        }}
      >
        <Text
          category="h1"
          style={{
            fontWeight: "bold",
            marginBottom: 5,
            textAlign: "center",
          }}
        >
          Select Your City
        </Text>
        <Input
          style={{ marginHorizontal: "9%", marginVertical: "2%" }}
          size="large"
          status="success"
          value={searchTerm}
          placeholder="Search"
          onChangeText={setSearchTerm}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "top",
            alignItems: "center",
          }}
        >
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
            style={{
              width: "85%",
              alignItems: "left",
              justifyContent: "top",
            }}
          >
            {filteredCities.map((city, index) => (
              <Radio status="success" key={index}>
                {city.city}
              </Radio>
            ))}
          </RadioGroup>
        </ScrollView>
        <Button
          size="large"
          status="success"
          onPress={handleContinue}
          disabled={selectedIndex === null}
          style={{
            borderRadius: 5,
            marginVertical: 5,
            width: "100%",
            alignSelf: "center",
          }}
        >
          Continue
        </Button>
      </Layout>
    </Screen>
  );
}
