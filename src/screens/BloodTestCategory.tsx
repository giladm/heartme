// BloodTestCategory - get test name and result, load dataset, anyalyze and return ok or not
// 
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppStateAction, AppStateContext, AppContextType } from '../types/AppStateContext';
import { getWebserviceURL } from '../webservice/WebServiceCall' 
import { BloodTestConfigEntity, BloodTestType, InputBloodTestType } from '../types/InterfaceTypes';

// for timestamp debugging 
import { logger } from "react-native-logs";
const console = logger.createLogger({
  levels: { log: 0, warn: 2, error: 3 }, transportOptions: {
    colors: "ansi"
  }
});

export const BloodTestCategory = ({ updateMain }) => {

  const appContext: AppContextType = useContext(AppStateContext);
  const userTestInput = appContext.inputBloodTest;

  const [userLoaded, setUserLoaded] = useState(false);
  const [originalDataset, setOriginalDataset] = useState<BloodTestConfigEntity[]>([])
  const [testCategoryIdx, setTestCategoryIdx] = useState(-1);
  const [categoryPass, setCategoryPass] = useState<boolean>();

  React.useEffect(() => {
    setTestCategoryIdx(-1);
    setUserLoaded(false);
    if (userTestInput !== undefined && userTestInput.TestName.length >0) {
      // console.log('*** cardlist() has changed. userId:', userTestInput);
      const getDataset = async () => {
        try {
          appContext.updateLoading(true);
          // const input: BloodTestType = await getWebserviceURL();
          const input:BloodTestType =JSON.parse(`{"bloodTestConfig":[  
            {"name":"LDL Cholesterol","threshold":100 },
            {  "name":"A1C","threshold":4},
            {  "name":"HDL Cholesterol","threshold":40 }
          ]}`);

          setOriginalDataset(input.bloodTestConfig);
          const lowerCaseInput: BloodTestConfigEntity[] = [];
          input.bloodTestConfig.map((set) => { 
            lowerCaseInput.push({ name: set.name.toLocaleLowerCase(), threshold: set.threshold })});
          if (lowerCaseInput.length > 0) {
            checkDatasetForTestInput(lowerCaseInput);
            setUserLoaded(true);
            // updateMain({ length: newArray.length, noData: false }); // display total questions and valid data
          } else {
            updateMain({ length: 0, noData: true }); // display something to that notion
            console.log('No data found on s3:',input);
          }
          appContext.updateLoading(false);
        } catch (error) {
          appContext.updateLoading(false);
          console.warn('error in app' + error);
        }
      }
      getDataset();
    }
  }, [userTestInput]);

  // Check user input against dataset.
  const checkDatasetForTestInput = (dataset:BloodTestConfigEntity[]) => {
    const arrayOfTestInput = userTestInput.TestName.toLowerCase().split(/[\s,\-\+]+/);
    console.log('Process dataset:', dataset, '\n and user text', arrayOfTestInput);
    var foundIdxArray: number[] = []; // dataset index where catefory is found
    var countIdxArray: number[] = Array(dataset.length).fill(0); // count the number of words found in each category
    arrayOfTestInput.some(function (elUser) {
      dataset.forEach((elDataset,testIdx) => {
        // if (elDataset.name.includes(elUser)) {
        if (new RegExp("\\b"+elUser+"\\b").test(elDataset.name)) {
          console.log(testIdx,'found input:',elUser,'in dataset:',elDataset);
          
          if (foundIdxArray.indexOf(testIdx) >=0 ) {
            console.log('already found', elUser,' in ', dataset[testIdx]);
            // Todo elevate test name that has more than one foundIdxArray
            countIdxArray[testIdx] = countIdxArray[testIdx]+1;
          }
          else {
            foundIdxArray.push(testIdx);
            countIdxArray[testIdx]=1;
          }
        }
      })
    });
    if (foundIdxArray.length > 0) {
      var idxMax = countIdxArray.reduce((iMax, x, i, arr) => (x != null && x > arr[iMax]) ? i : iMax, 0);
      setCategoryPass(userTestInput.TestResult < dataset[idxMax].threshold ? true : false)
      setTestCategoryIdx(idxMax);
      console.log('Found catefory:', dataset[idxMax],'matching user input at index:',idxMax);
    } else {
      setTestCategoryIdx(-1); //
      console.log('Did not find any category matching user input', countIdxArray);
    }
  }
  return (
    <>
      {userLoaded ?
        (<View style={styles.viewCategory} >
          {testCategoryIdx >= 0 ?
            (<View style={styles.viewCategory}>
              <Text style={styles.textCategory}>
                {originalDataset[testCategoryIdx].name}{'  '}{categoryPass ? 'Good!' : 'Bad!'}
              </Text>
              <AntDesign 
                size={100} 
                name={categoryPass ? 'smileo' : 'frowno'} 
                color={categoryPass ? 'green' : 'red'} 
              />
            </View>) :
            (<View>
              <Text style={styles.textCategory}>
                Unknown
              </Text>
            </View>)}
        </View>)
        : null}
    </>
  );
}

const styles = StyleSheet.create({
  viewCategory: { 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
 },
  textCategory: {
    fontSize: 16,
    margin: 10,
  },
});
