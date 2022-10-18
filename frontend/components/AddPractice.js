import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddPractice() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    setSelectedDate(`${day}-${month}-${year}`);
    hideDatePicker();
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
      length: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  /* 
  async function addPractice() {
    try {
      const response = await fetch("http://192.168.1.196:3000/api/practice");
      const json = await response.json();
      console.log(json.body);
      setPractices(json.body);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  } */

  return (
    <SafeAreaView style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity onPress={showDatePicker} style={styles.input}>
              <Text>{selectedDate}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode='date'
              firstDayOfWeek={1}
              onConfirm={(date) => {
                onChange(date);
                handleConfirm(date);
              }}
              onCancel={hideDatePicker}
              onBlur={onBlur}
              value={value}
            />
          </>
        )}
        name='date'
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Length of practice (in minutes)'
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType='numeric'
          />
        )}
        name='length'
      />
      {errors.date && <Text>This is required.</Text>}
      {errors.length && <Text>This is required.</Text>}

      <TouchableOpacity style={styles.input} onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <ExpoStatusBar hidden={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  box: {
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 5,
    padding: 5,
    margin: 10,
  },
  pageHeading: {
    fontWeight: "bold",
    fontSize: 36,
  },
  boxHeading: {
    fontWeight: "bold",
    fontSize: 22,
  },
  boxSubHeading: {
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
