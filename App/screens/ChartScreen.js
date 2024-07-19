import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StackedBarChart, LineChart } from "react-native-chart-kit";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getWeeklyWorkLeisureSummary } from "../services/api"; // Import the API functions

const screenWidth = Dimensions.get("window").width;

const ChartScreen = () => {
  const [workLeisureData, setWorkLeisureData] = useState(null);
  const [sleepData, setSleepData] = useState(null);
  const [startDate, setStartDate] = useState(new Date("2024-07-15")); // Initial start date
  const [endDate, setEndDate] = useState(new Date("2024-07-21")); // Initial end date
  const [loading, setLoading] = useState(true);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workLeisureResponse = await getWeeklyWorkLeisureSummary(
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0]
        );
        console.log(workLeisureResponse);
        setWorkLeisureData(formatWorkLeisureDataForChart(workLeisureResponse));
        setSleepData(formatSleepDataForChart(workLeisureResponse));
        console.log(sleepData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const formatWorkLeisureDataForChart = (data) => {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const workData = labels.map((day) => data[day]?.Work || 0);
    const leisureData = labels.map((day) => data[day]?.Leisure || 0);

    return {
      labels,
      legend: ["Work", "Leisure"],
      data: labels.map((_, index) => [workData[index], leisureData[index]]),
      barColors: ["#4CAF50", "#FFFFFF"],
    };
  };

  const formatSleepDataForChart = (data) => {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const sleepHours = labels.map((day) => data[day]?.Sleep || 0);

    return {
      labels,
      datasets: [
        {
          data: sleepHours,
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Green color
          strokeWidth: 2,
        },
      ],
    };
  };

  const handleShowStartDatePicker = () => {
    setShowStartDatePicker(true);
  };

  const handleShowEndDatePicker = () => {
    setShowEndDatePicker(true);
  };

  const hideDatePickers = () => {
    setShowStartDatePicker(false);
    setShowEndDatePicker(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!workLeisureData || !sleepData) {
    return <Text>Unable to fetch data</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Work-Life Balance Charts</Text>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          onPress={handleShowStartDatePicker}
          style={styles.dateButton}
        >
          <Text style={styles.datePickerText}>
            Start Date: {startDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShowEndDatePicker}
          style={styles.dateButton}
        >
          <Text style={styles.datePickerText}>
            End Date: {endDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || startDate;
            setStartDate(currentDate);
            setShowStartDatePicker(false);
          }}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || endDate;
            setEndDate(currentDate);
            setShowEndDatePicker(false);
          }}
        />
      )}

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Work vs Leisure Time</Text>
        <StackedBarChart
          data={workLeisureData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          verticalLabelRotation={30}
          hideLegend={false}
          showBarTops={false}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Sleep Hours</Text>
        <LineChart
          data={sleepData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      {/* Other charts can be added here similar to the original code */}
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#E0F7FA",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#E0F7FA",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  propsForLabels: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: "#e3e3e3",
    strokeDasharray: "0", // solid background lines with no dashes
  },
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
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  dateButton: {
    padding: 10,
    backgroundColor: "#E0F7FA",
    borderRadius: 5,
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
