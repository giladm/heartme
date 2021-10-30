// MainScreen

import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { Colors } from '../constants/Colors';
import { InputBloodTest } from './InputBloodTest';
import { BloodTestCategory } from './BloodTestCategory';
import { WaveIndicator } from 'react-native-indicators';
import { AppStateContext, AppContextType } from '../types/AppStateContext';

export const MainScreen = () => {
  const appContext: AppContextType = useContext(AppStateContext);
  const isDbLoading: boolean = appContext.isLoading; // when using rest api
  const [totalQuestion, setTotalQuestion] = useState<number>();
  const [noData, setNoData] = useState(false);

  const updateMain = (update) => {
    console.log('> > updateMain :', update);
    setTotalQuestion(update.length); // total of questions
    setNoData(update.noData); // any data for user
  }
  const Separator = () => (
    <View style={styles.separator} />
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <InputBloodTest />
        <BloodTestCategory updateMain={updateMain}/>
        <View style={styles.BottomViewArea}>
          {isDbLoading ?
            (<View style={styles.indicatorPosition}>
              <Text style={[styles.indicatorText, { color: 'blue' }]}>Loading Data...</Text>
              <WaveIndicator color={'blue'} size={80} />
            </View>) : null}
        </View>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'column',

  },
  BottomViewArea: {
    flex: 1,
    width: '100%',
    height: 30,
    backgroundColor: Colors.primary,
    // paddingLeft: 5,
    position: 'absolute',
    bottom: 0,
  },
  indicatorPosition: {
    flex: 1,
    paddingBottom: 100,
  },
  indicatorText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});