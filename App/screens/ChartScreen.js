import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const ChartScreen = () => {
  const workLeisureData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Work",
        data: [8, 9, 7, 8, 6, 4, 0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
      {
        label: "Leisure",
        data: [2, 3, 4, 3, 5, 6, 8],
        color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`,
      },
    ],
  };

  const sleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [7, 6, 8, 7, 7.5, 8, 9],
        strokeWidth: 2,
      },
    ],
  };

  const stressData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [3, 4, 5, 6, 4, 3, 2],
        strokeWidth: 2,
      },
    ],
  };

  const productivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [80, 90, 70, 85, 95],
      },
    ],
  };

  const exerciseData = [
    {
      name: "Running",
      population: 40,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Cycling",
      population: 30,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Yoga",
      population: 20,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Gym",
      population: 10,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Work-Life Balance Charts</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Work vs Leisure Time</Text>
        <BarChart
          data={workLeisureData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          verticalLabelRotation={30}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Daily Sleep Patterns</Text>
        <LineChart
          data={sleepData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Stress Levels Over Time</Text>
        <LineChart
          data={stressData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Productivity Levels</Text>
        <BarChart
          data={productivityData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Exercise Frequency</Text>
        <PieChart
          data={exerciseData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  chartContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    color: "#555",
  },
  chart: {
    borderRadius: 16,
  },
});

export default ChartScreen;
