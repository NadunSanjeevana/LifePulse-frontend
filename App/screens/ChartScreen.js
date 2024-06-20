import React from "react";
import { View, Text, ScrollView } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ChartScreen = () => {
  // Dummy data for the line chart
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  // Dummy data for the bar chart
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  // Dummy data for the pie chart
  const pieChartData = [
    {
      name: "Seoul",
      population: 21500000,
      color: "#F44336",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#2196F3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#FFEB3B",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "#4CAF50",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={{ marginTop: 20 }}>
        <Text>Line Chart Example</Text>
        <LineChart
          data={lineChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Bar Chart Example</Text>
        <BarChart
          data={barChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>Pie Chart Example</Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </ScrollView>
  );
};

export default ChartScreen;
