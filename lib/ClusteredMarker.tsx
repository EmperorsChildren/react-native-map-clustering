import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Marker } from "react-native-maps";

import { getCenterOffsetForAnchor, returnMarkerStyle } from "./helpers";

const ClusteredMarker = ({
  geometry,
  properties,
  onPress,
  clusterColor,
  clusterTextColor,
  clusterOuterColor,
  clusterFontFamily,
  tracksViewChanges,
}) => {
  const points = properties.point_count;
  const { width, height, fontSize, size } = returnMarkerStyle(points);

  return (
    <Marker
      // anchor={{ x: 0.5, y: 0.5 }}
      // centerOffset={getCenterOffsetForAnchor({ x: 0.5, y: 0.5 }, width, height)}
      key={`${geometry.coordinates[0]}_${geometry.coordinates[1]}`}
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      style={{ zIndex: points + 1 }}
      onPress={onPress}
      tracksViewChanges={tracksViewChanges}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.container, { width, height }]}
      >
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: clusterOuterColor || clusterColor,
              width,
              height,
              borderRadius: width / 2,
            },
          ]}
        />
        <View
          style={[
            styles.cluster,
            {
              backgroundColor: clusterColor,
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: clusterTextColor,
                fontSize,
                fontFamily: clusterFontFamily,
              },
            ]}
          >
            {points}
          </Text>
        </View>
      </TouchableOpacity>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    position: "absolute",
    zIndex: 0,
  },
  cluster: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontWeight: "bold",
  },
});

export default memo(ClusteredMarker);
