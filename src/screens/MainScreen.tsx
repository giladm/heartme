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
  const [bottomMsg, setBottomMsg] = useState(false);

  const updateMain = (message) => {
    console.log('> > updateMain :', message);
    setBottomMsg(message); // bottom message 
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <InputBloodTest />
        <BloodTestCategory updateMain={updateMain}/>
        <View style={styles.BottomViewArea}>
          {isDbLoading ?
            (<View style={styles.indicatorPosition}>
              <Text style={styles.indicatorText}>Loading Data...</Text>
              <WaveIndicator color={'blue'} size={60} />
            </View>) : 
            <Text style={styles.bottomText}>{bottomMsg}</Text>
            }
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
    paddingBottom: 10,
  },
  indicatorText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white' ,
  },
  bottomText: {
    fontSize: 10,
    flexDirection: 'column',
    color: 'white',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});