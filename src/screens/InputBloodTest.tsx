//InputBloodTest - 
import React, { useContext, useState } from 'react';
import { AppStateAction, AppStateContext, AppContextType } from '../types/AppStateContext';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Colors } from '../constants/Colors';
import { logger } from "react-native-logs";
import { InputBloodTestType } from '../types/InterfaceTypes';

export const InputBloodTest = () => {
  const console = logger.createLogger({
    levels: { log: 0, warn: 2, error: 3 }, transportOptions: { colors: "ansi" }
  });
  const appContext: AppContextType = useContext(AppStateContext);
  const [testName, setTestName] = useState('');
  const [testResult, setTestResult] = useState<string|null>();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const pattern = new RegExp(/[^a-zA-Z 0-9(),-:\/]/g); // user allowed input : A-Z', 'a-z', '0-9' and '(),-:/!
  
  React.useEffect(() => {
    if (testName === undefined || testResult === undefined) return;
    const stripText = testName.replace(pattern, "");
    const stripNumber = testResult.replace(/\D\./g, '');
    // console.log('after strip stripNumber:', stripNumber);

    // todo parseFloat(stripNumber));
    if (stripText.length > 0 && stripNumber.length> 0) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [testName,testResult]);

  const onChangeTestName = (value) => {
    setTestName(value);
    appContext.changeAppState(AppStateAction.ChangeUserInput, { value: undefined }); // reset result
  };

  const onChangeTestResult = (value) => {
    setTestResult(value);
    appContext.changeAppState(AppStateAction.ChangeUserInput, { value: undefined }); // reset result
  };

  const processUserInput = () => {
    // console.log('>> process user input[' + testName.trim() + ']');
    const stripNonDigit = testResult.replace(/\D\./g, '');
    const stripCommas = parseFloat(stripNonDigit.replace(/,/g, ''));
    // console.log('stripCommas', stripCommas);
    const testInput: InputBloodTestType = {TestName: testName, TestResult: stripCommas}
    appContext.changeAppState(AppStateAction.ChangeUserInput, {value: testInput});
  };
  const testResultRef: any = React.useRef();

  return (
    <>
      <View style={styles.useridView}>
        <Text style={styles.headerText}>
          Blood Test Results</Text>
        <Text style={styles.secondHeaderText}>
          Am I OK?</Text>
        <TextInput style={styles.inputText}
          onChangeText={(text) => onChangeTestName(text)}
          value={testName}
          placeholder='Test Name'
          keyboardType="default"
          returnKeyType="next"
          onSubmitEditing={() => {
            testResultRef.current.focus();
          }}
        />
        <TextInput style={styles.inputText}
          onChangeText={(text) => onChangeTestResult(text)}
          value={testResult}
          placeholder='Result'
          keyboardType="numeric"
          ref={testResultRef}
          maxLength={20}
          onSubmitEditing={processUserInput}
        />
        <View style={styles.fixToText}>
          <Button
            onPress={() => processUserInput()}
            title='Submit'
            disabled={buttonDisabled}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  useridView: {
    alignItems: 'center',
    paddingBottom: 25,
  },
  headerText: {
    fontSize: 22,
    padding: 30,
    marginHorizontal: 1,
    color: Colors.textColor,
  },
  secondHeaderText: {
    fontSize: 20,
    paddingBottom: 10,
    marginHorizontal: 1,
    color: Colors.textColor,
  },
  inputText: {
    height: 30,
    margin: 6,
    borderWidth: 1,
    padding: 1,
    width: 200,
    color: Colors.textColor,
    backgroundColor: Colors.backgroundText,
  },
  fixToText: {
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});