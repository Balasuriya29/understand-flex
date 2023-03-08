import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";

import AppIcon from "./app/components/AppIcon";
import AppButton from "./app/components/AppButton";
import AppFloatingActionButton from "./app/components/AppFloatingActionButton";

import colors from "./app/config/colors";
import {
  justifyContents,
  alignContents,
  alignItemsArr,
  wraps,
  modes,
  flex_direction,
} from "./app/config/data";

const randomHexColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const Box = (id) => {
  return (
    <View
      key={id}
      style={{
        width: 75,
        height: 75,
        backgroundColor: "#" + randomHexColor(),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        {id}
      </Text>
    </View>
  );
};

export default function App() {
  const [toggleBG, setBG] = useState(0);

  const [totalBox, setTotalBox] = useState([Box(1), Box(2), Box(3)]);
  const [flexDirectionsindex, setFlexDirectionsIndex] = useState(0);
  const [wrapindex, setWrapIndex] = useState(0);
  const [justifycontentindex, setJustifyContentIndex] = useState(0);
  const [alignitemsindex, setAlignItems] = useState(0);
  const [aligncontentsindex, setAlignContents] = useState(0);
  const [columngap, setColumnGap] = useState(0);
  const [rowgap, setRowGap] = useState(0);

  return (
    <React.Fragment>
      <StatusBar
        animated={true}
        backgroundColor={modes[toggleBG].backgroundColor}
        barStyle={modes[toggleBG].barStyle}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: modes[toggleBG].backgroundColor },
        ]}
      >
        <View
          style={[
            styles.boxContainer,
            {
              flexDirection: flex_direction[flexDirectionsindex],
              flexWrap: wraps[wrapindex],
              justifyContent: justifyContents[justifycontentindex],
              alignItems: alignItemsArr[alignitemsindex],
              alignContent: alignContents[aligncontentsindex],
              columnGap: columngap,
              rowGap: rowgap,
            },
          ]}
        >
          {totalBox.length !== 0 ? (
            totalBox.map((box) => box)
          ) : (
            <Text
              style={{
                color: modes[toggleBG ^ 1].backgroundColor,
              }}
            >
              Add a Box
            </Text>
          )}
        </View>

        <View style={[styles.titleContainer]}>
          <Text style={styles.title}>UNDERSTAND FLEX!!</Text>
        </View>

        <View style={[styles.buttonContainer]}>
          <AppButton
            title={"Add Box"}
            onPress={() => {
              setTotalBox([...totalBox, Box(totalBox.length + 1)]);
            }}
          />
          <AppButton
            title={"Delete Box"}
            onPress={() => {
              totalBox.pop();
              setTotalBox([...totalBox]);
            }}
          />
          <AppButton
            title={`Flex Direction\n${
              flexDirectionsindex === 0 ? "Default: " : ""
            }${flex_direction[flexDirectionsindex]}`}
            onPress={() => {
              setFlexDirectionsIndex((flexDirectionsindex + 1) % 4);
            }}
          />
          <AppButton
            title={`Justify Content\n${
              justifycontentindex === 0 ? "Default: " : ""
            }${justifyContents[justifycontentindex]}`}
            onPress={() => {
              setJustifyContentIndex((justifycontentindex + 1) % 6);
            }}
          />
          <AppButton
            title={`Align Items\n${alignitemsindex === 0 ? "Default: " : ""}${
              alignItemsArr[alignitemsindex]
            }`}
            onPress={() => {
              setAlignItems((alignitemsindex + 1) % 5);
            }}
          />
          <AppButton
            title={`Wrap\n${wrapindex === 0 ? "Default: " : ""}${
              wraps[wrapindex]
            }`}
            onPress={() => {
              setWrapIndex((wrapindex + 1) % 3);
              if (wrapindex === 0) {
                setColumnGap(0);
                setAlignContents(0);
              }
            }}
          />
          {wrapindex !== 0 ? (
            <AppButton
              title={`Align Content\n${
                aligncontentsindex === 0 ? "Default: " : ""
              }${alignContents[aligncontentsindex]}`}
              onPress={() => {
                setAlignContents((aligncontentsindex + 1) % 6);
              }}
            />
          ) : null}

          <View style={styles.incDecContainer}>
            <Pressable
              onPress={() => {
                setColumnGap(columngap + 1);
              }}
            >
              <AppIcon
                style={styles.icons}
                name="plus"
                backgroundColor={colors.primary}
                size={50}
              />
            </Pressable>
            <Text style={styles.text}>Column{"\n"}Gap</Text>
            <Pressable
              onPress={() => {
                setColumnGap(columngap - 1);
              }}
            >
              <AppIcon
                style={styles.icons}
                name="minus"
                backgroundColor={colors.primary}
                size={50}
              />
            </Pressable>
          </View>
          <View style={styles.incDecContainer}>
            <Pressable
              onPress={() => {
                setRowGap(rowgap + 1);
              }}
            >
              <AppIcon
                style={styles.icons}
                name="plus"
                backgroundColor={colors.primary}
                size={50}
              />
            </Pressable>
            <Text style={styles.text}>Row Gap</Text>
            <Pressable
              onPress={() => {
                setRowGap(rowgap - 1);
              }}
            >
              <AppIcon
                style={styles.icons}
                name="minus"
                backgroundColor={colors.primary}
                size={50}
              />
            </Pressable>
          </View>
        </View>

        <AppFloatingActionButton
          onPress={() => {
            setBG(toggleBG ^ 1);
          }}
          rippleConfig={{
            color: "white",
            foreground: true,
            radius: 30,
            borderless: true,
          }}
          name={modes[toggleBG].iconName}
          backgroundColor={modes[toggleBG].iconBG}
          iconColor={modes[toggleBG].iconColor}
          size={60}
        />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    height: "50%",
  },
  buttonContainer: {
    height: "45%",
    backgroundColor: colors.secondary,
    alignContent: "center",
    flexWrap: "wrap",
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f4f4",
  },
  incDecContainer: {
    paddingVertical: 10,
    paddingLeft: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: 600,
    color: colors.black,
    paddingHorizontal: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    paddingTop: 16,
  },
  titleContainer: {
    height: "5%",
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});
