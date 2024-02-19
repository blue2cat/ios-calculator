import { render, fireEvent } from '@testing-library/react-native';
import CalculatorScreen from '../screens/CalculatorScreen';

describe('CalculatorScreen', () => {
  // test rendering
  it('should render the calculator screen', () => {
    const { getByTestId } = render(<CalculatorScreen />);
    const calculatorScreen = getByTestId('calculator-screen');
    expect(calculatorScreen).toBeDefined();
  });

  // test number input
  it('should add numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('3'));

    expect(calculatorInput.props.value).toBe('123');
  });

  // test addition
  it('should add two numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('3'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('5');
  });

  // test subtraction
  it('should subtract two numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('5'));
    fireEvent.press(getByText('-'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('3');
  });

  // test multiplication
  it('should multiply two numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('3'));
    fireEvent.press(getByText('*'));
    fireEvent.press(getByText('4'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('12');
  });

  // test division
  it('should divide two numbers when pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('4');
  });

  // test complex calculation
  it('should perform a complex calculation', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('12');
  });

  // test a user error case: neighboring operators
  it('should catch some user errors', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('*'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('64');
  });

  // ensure the clear button works
  it('should clear the display when the clear button is pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('C'));

    expect(calculatorInput.props.value).toBe('0');
  });

  // ensure the +/- button works
  it('should change the sign of the number when the +/- button is pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('+/-'));

    expect(calculatorInput.props.value).toBe('-8');
  });

  // ensure the % button works
  it('should convert the number to a percentage when the % button is pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('%'));

    expect(calculatorInput.props.value).toBe('0.08');
  });

  // ensure the . button works
  it('should add a decimal point to the number when the . button is pressed', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('8'));

    expect(calculatorInput.props.value).toBe('8.8');
  });

  // ensure division by zero is caught
  it('should catch division by zero', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('Error');
  });

  // handle starting with an operator
  it('should handle starting with an operator', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('8');
  });

  // handle starting with zero
  it('should handle starting with zero', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('0'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('8');
  });

  // handle starting with a decimal point
  it('should handle starting with a decimal point', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('0.8');
  });

  // handle starting with a negative number
  it('should handle starting with a negative number', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('-'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('-8');
  });

  // handle starting with a negative number and a decimal point
  it('should handle starting with a negative number and a decimal point', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('-'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('-0.8');
  });

  // ensure two decimal points are not added
  it('should not add two decimal points to a number', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('.'));
    fireEvent.press(getByText('8'));
    fireEvent

    expect(calculatorInput.props.value).toBe('0.8');
  });

  // should gracefully handle invalid input
  it('should gracefully handle invalid input', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    // press a bunch of buttons
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('*'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('/'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('%'));
    fireEvent.press(getByText('+/-'));
    fireEvent.press(getByText('C'));
  });

  // ensure the display updates when the memory is updated
  it('should update the display when the memory is updated', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    // press a bunch of buttons
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('='));

    expect(calculatorInput.props.value).toBe('16');
  });

  // gracefully handle statements that end with an operator
  it('should gracefully handle statements that end with an operator', () => {
    const { getByText, getByTestId } = render(<CalculatorScreen />);
    const calculatorInput = getByTestId('calculator-input');

    // press a bunch of buttons
    fireEvent.press(getByText('8'));
    fireEvent.press(getByText('+'));
    fireEvent.press(getByText('+'));

    expect(calculatorInput.props.value).toBe('8+');
  });

});
