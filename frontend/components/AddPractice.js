import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectList from "react-native-dropdown-select-list";

export default function AddPractice() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [selectedPracticeOption, setSelectedPracticeOption] = useState(null);
  const practiceOptions = [
    "Piece",
    "Scales",
    "Improvising",
    "Theory",
    "Aural",
    "Sight Reading",
    "Excerpt",
  ];

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
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: today,
      length: "",
      practiced: "",
    },
  });
  const onSubmit = (data) => {
    addPractice(data);
  };

  //TODO Add backend options for Practiced (and fetch these to populate dropdown)??

  async function addPractice(practice) {
    //Strip any potential leading 0s from length and typecast to Number
    practice.length = parseInt(practice.length, 10);
    //Check practice object for empty or undefined values and remove them (only date and length are required)
    for (const key in practice) {
      if (practice[key] === undefined || practice[key] === "") {
        delete practice[key];
      }
    }
    console.log("Here is the modified practice object");
    console.log(practice);
    try {
      const response = await fetch("http://192.168.1.196:3000/api/practice", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(practice),
      });
      const json = await response.json();
      console.log(json.body);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: "Date is required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity onPress={showDatePicker} style={styles.input}>
              <Text>Date: {selectedDate}</Text>
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
      {errors.date && (
        <View style={{ marginBottom: 12 }}>
          <Text>{errors.date?.message}</Text>
        </View>
      )}

      <Controller
        control={control}
        rules={{
          required: "Length is required",
          pattern: {
            value: /^\d+$/,
            message: "Must be a whole number",
          },
          min: {
            value: 1,
            message: "Minimum value is 1",
          },
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
      {errors.length && (
        <View style={{ marginBottom: 12 }}>
          <Text>{errors.length?.message}</Text>
        </View>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectList
            placeholder='What have you practiced?'
            data={practiceOptions}
            search={false}
            boxStyles={{ marginBottom: 12 }}
            onBlur={onBlur}
            setSelected={(selected) => {
              onChange(selected);
              setSelectedPracticeOption(selected);
            }}
            value={value}
          />
        )}
        name='practiced'
      />
      {errors.practiced && (
        <View style={{ marginBottom: 12 }}>
          <Text>{errors.practiced?.message}</Text>
        </View>
      )}

      {selectedPracticeOption === "Piece" ||
      selectedPracticeOption === "Excerpt" ? (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Piece Composer'
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='composer'
        />
      ) : null}
      {errors.composer && (
        <View style={{ marginBottom: 12 }}>
          <Text>{errors.composer?.message}</Text>
        </View>
      )}
      {selectedPracticeOption === "Piece" ||
      selectedPracticeOption === "Excerpt" ? (
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Piece Title'
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='title'
        />
      ) : null}
      {errors.title && (
        <View style={{ marginBottom: 12 }}>
          <Text>{errors.title?.message}</Text>
        </View>
      )}

      <Button
        style={styles.input}
        title='Submit'
        onPress={handleSubmit(onSubmit)}
        accessibilityLabel='Submit the form'
      />

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
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
