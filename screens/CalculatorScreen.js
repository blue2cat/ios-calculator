import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { StyledButton } from "../components";

const CalculatorScreen = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState("");

  // reformat the display when it changes
  useEffect(() => {
    setMemory(memory + ""); // cast to string

    // add commas to the display
    setDisplay(addCommas(display));

    // trim any leading - signs
    if (display.startsWith("-")) {
      const temp = display.substring(1);
      // if the next character is a ., add a 0
      setDisplay(temp.startsWith(".") ? "-0" + temp : "-" + temp);
    } else {
      // if the first character is a ., add a 0
      if (display.includes(".")) {
        setDisplay(display.startsWith(".") ? "0" + display : display);
      }
    }
  }, [display]);

  // triggered when a number is pressed
  const handleNumberPress = (number) => {
    // ensure that we don't add multiple decimal points in each individual number
    if (number === "." && display.includes(".")) {
      return;
    }

    // handle the case when the display is 0
    if (display === "0") {
      setDisplay(number);
      setMemory(number);
    } else {
      setDisplay(memory + number);
      setMemory(memory + number);
    }
  };

  // function to add commas to the display
  const addCommas = (displayNumber) => {
    // check to make sure input is a number
    if (isNaN(displayNumber)) {
      return displayNumber;
    }

    // use regex to add commas to the number
    const parts = displayNumber.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  // triggered when an operator is pressed
  const handleOperatorPress = (operator) => {
    // handle the case when the operator is "+/-"
    if (operator == "+/-") {
      if (display.startsWith("-")) {
        setDisplay(display.substring(1));
      } else {
        setDisplay("-" + display);
      }

      setMemory(memory * -1);
      return;
    }

    // handle the case when the operator is "%"
    if (operator == "%") {
      setDisplay((memory / 100).toString());
      setMemory((memory / 100).toString());
      return;
    }

    if (memory.length > 0 && !isNaN(memory[memory.length - 1])) {
      setMemory(memory + operator);
      setDisplay(display + operator);
    } else {
      // if the last character in memory is an operator, replace it with the new operator
      setMemory(memory.slice(0, -1) + operator);
      setDisplay(display.slice(0, -1) + operator);
    }
  };

  // triggered when the equal sign is pressed
  const handleEqualPress = () => {
    if (!containsOperator(memory)) {
      return;
    }

    // catch division by zero
    if (memory.includes("/0")) {
      setDisplay("Error");
      setMemory("Error");
      return;
    }

    // catch the case when the last character in memory is an operator
    if (endsWithOperator(memory)) {
      setMemory(memory.slice(0, -1));
      return;
    }

    // evaluate the expression
    const res = new Function(`return ${memory}`)();
    setDisplay(res + "");
    setMemory(res + "");
  };

  // triggered when the clear button is pressed
  const handleClearPress = () => {
    setDisplay("0");
    setMemory("0");
  };

  // helper function to check if a string contains an operator
  const containsOperator = (str) => {
    return (
      (!str.startsWith("-") && str.includes("-")) ||
      str.includes("+") ||
      str.includes("*") ||
      str.includes("/")
    );
  };

  // helper function to check if a string ends with an operator
  const endsWithOperator = (str) => {
    return (
      str.endsWith("-") ||
      str.endsWith("+") ||
      str.endsWith("*") ||
      str.endsWith("/")
    );
  };

  return (
    <View style={styles.container} testID="calculator-screen">
      <TextInput
        style={styles.result}
        value={display}
        editable={false}
        testID="calculator-input"
      />
      <View style={styles.row}>
        <StyledButton
          text="C"
          handler={handleClearPress}
          style={styles.topOperator}
        />
        <StyledButton
          text="+/-"
          handler={handleOperatorPress}
          style={styles.topOperator}
        />
        <StyledButton
          text="%"
          handler={handleOperatorPress}
          style={styles.topOperator}
        />
        <StyledButton text="/" handler={handleOperatorPress} />
      </View>
      <View style={styles.row}>
        <StyledButton text="7" handler={handleNumberPress} />
        <StyledButton text="8" handler={handleNumberPress} />
        <StyledButton text="9" handler={handleNumberPress} />
        <StyledButton
          text="*"
          handler={handleOperatorPress}
          style={styles.opButton}
        />
      </View>
      <View style={styles.row}>
        <StyledButton text="4" handler={handleNumberPress} />
        <StyledButton text="5" handler={handleNumberPress} />
        <StyledButton text="6" handler={handleNumberPress} />
        <StyledButton
          text="-"
          handler={handleOperatorPress}
          style={styles.opButton}
        />
      </View>
      <View style={styles.row}>
        <StyledButton text="1" handler={handleNumberPress} />
        <StyledButton text="2" handler={handleNumberPress} />
        <StyledButton text="3" handler={handleNumberPress} />
        <StyledButton
          text="+"
          handler={handleOperatorPress}
          style={styles.opButton}
        />
      </View>
      <View style={styles.row}>
        <StyledButton
          text="0"
          handler={handleNumberPress}
          style={styles.zeroButton}
        />
        <StyledButton text="." handler={handleNumberPress} />
        <StyledButton
          text="="
          handler={handleEqualPress}
          style={styles.opButton} // Change handler to handleEqualPress
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  result: {
    color: "white",
    fontSize: 40,
    width: "90%",
    textAlign: "right",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginBottom: 5,
  },
  opButton: {
    fontSize: 30,
    color: "white",
    backgroundColor: "#ff8c00",
  },
  zeroButton: {
    width: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  topOperator: {
    backgroundColor: "#a6a6a6",
  },
});

export default CalculatorScreen;
