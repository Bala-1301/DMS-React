import React from 'react';
import {Document, Page, Text, StyleSheet, View} from '@react-pdf/renderer';


const styles = StyleSheet.create({
  table: { 
    margin: 10,
    marginTop: 30,
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderRightWidth: 0, 
    borderBottomWidth: 0
  },
  tableHead: {
    fontSize: 16,
    margin: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: { 
    margin: "auto", 
    flexDirection: "row",
    borderWidth: 1, 
  }, 
  medicineName: {
    width: '25%',
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCol: { 
    width: "15%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: 5,
    fontSize: 14 
  }
});

export const PatientRecord = (props) => (
    <Document>
      <Page size="A4">
        <View style={styles.table}> 
          <View style={styles.tableRow}> 
            <View style={styles.medicineName}> 
              <Text style={styles.tableHead}>Medicine</Text> 
            </View> 
            <View style={styles.tableCol}>
              <Text style={styles.tableHead}>Days</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableHead}>Morning</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableHead}>Afternoon</Text> 
            </View>
            <View style={styles.tableCol}> 
              <Text style={styles.tableHead}>Evening</Text> 
            </View>
            <View style={styles.tableCol}> 
              <Text style={styles.tableHead}>Night</Text> 
            </View> 
          </View>
          {props.map((item) => {
            return (
              <View style={styles.tableRow} key={item.id}>  
                <View style={styles.medicineName}> 
                  <Text style={styles.tableCell}>{item.medicine}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{item.days}</Text> 
                </View> 
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.morning? "Yes" : "No"}</Text> 
                </View>
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{item.afternoon? "Yes" : "No"}</Text> 
                </View>
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{item.evening? "Yes" : "No"}</Text> 
                </View>
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{item.night? "Yes" : 'No'}</Text> 
                </View> 
              </View>
            )
          })} 
        </View>
      </Page>
    </Document>
)

