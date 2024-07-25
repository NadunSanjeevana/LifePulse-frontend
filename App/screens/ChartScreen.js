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
import { BarChart, LineChart } from "react-native-gifted-charts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getWeeklyWorkLeisureSummary } from "../services/api"; // Import the API functions
import { AppGradient } from "../Components/AppGradient";

const screenWidth = Dimensions.get("window").width;

const getMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
};

const getSunday = (date) => {
  const d = new Date(getMonday(date));
  return new Date(d.setDate(d.getDate() + 6));
};

const ChartScreen = () => {
  const [workLeisureData, setWorkLeisureData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [startDate, setStartDate] = useState(getMonday(new Date()));
  const [endDate, setEndDate] = useState(getSunday(new Date()));
  const [loading, setLoading] = useState(true);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const workLeisureResponse = await getWeeklyWorkLeisureSummary(
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0]
        );
        const sanitizedData = sanitizeData(workLeisureResponse);
        setWorkLeisureData(formatWorkLeisureDataForChart(sanitizedData));
        setSleepData(formatSleepDataForChart(sanitizedData));
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const sanitizeData = (data) => {
    const sanitizedData = {};
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    days.forEach((day) => {
      sanitizedData[day] = {
        Work: data[day] && data[day].Work ? data[day].Work : 0,
        Leisure: data[day] && data[day].Leisure ? data[day].Leisure : 0,
        Sleep: data[day] && data[day].Sleep ? data[day].Sleep : 0,
      };
    });
    return sanitizedData;
  };

  const formatWorkLeisureDataForChart = (data) => {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const formattedData = [];

    labels.forEach((day) => {
      formattedData.push(
        {
          value: data[day]?.Work || 0,
          label: day,
          frontColor: "#4CAF50", // Color for work bars
          labelTextStyle: { color: "#333" },
          spacing: 10,
          labelWidth: 30,
        },
        {
          value: data[day]?.Leisure || 0,
          frontColor: "#FFC107", // Color for leisure bars
        }
      );
    });

    return formattedData;
  };

  const formatSleepDataForChart = (data) => {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const sleepData = labels.map((day) => ({
      value: data[day]?.Sleep || 0,
      label: day,
      frontColor: "#00BFFF", // Color for sleep data
    }));

    return sleepData;
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
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!workLeisureData.length || !sleepData.length) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to fetch data</Text>
      </View>
    );
  }

  return (
    <AppGradient>
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
              setStartDate(getMonday(currentDate));
              setEndDate(getSunday(currentDate));
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
              setStartDate(getMonday(currentDate));
              setEndDate(getSunday(currentDate));
              setShowEndDatePicker(false);
            }}
          />
        )}

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Work vs Leisure Time</Text>
          <BarChart
            data={workLeisureData}
            barWidth={10}
            spacing={10}
            yAxisTextStyle={{ color: "#333" }}
            noOfSections={12}
            maxValue={12}
            style={styles.barChart}
            renderTooltip={(item, index) => {
              return (
                <View
                  style={{
                    marginBottom: 20,
                    marginLeft: -6,
                    backgroundColor: "#ffcefe",
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text>{item.value}</Text>
                </View>
              );
            }}
          />
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#4CAF50" }]}
              />
              <Text style={styles.legendText}>Work</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#FFC107" }]}
              />
              <Text style={styles.legendText}>Leisure</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Sleep Hours</Text>
          <LineChart
            data={sleepData}
            height={220}
            spacing={40}
            chartConfig={chartConfig}
            style={styles.lineChart}
            color="#4CAF50"
          />
        </View>
      </ScrollView>
    </AppGradient>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#E0F7FA",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#E1F5FE",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForLabels: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: "#e3e3e3",
    strokeDasharray: "0",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
    color: "#4CAF50",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: "#4CAF50",
  },
  chartContainer: {
    marginVertical: 20,
    alignItems: "center",

    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundGradientFrom: "#E0F7FA",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#E0F7FA",
    backgroundGradientToOpacity: 0.5,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 10,
  },
  barChart: {
    borderRadius: 16,
  },
  lineChart: {
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  dateButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
});

export default ChartScreen;
