import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function ResultRow({ label, value }) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>${value.toFixed(2)}</Text>
    </View>
  );
}

export default function MainScreen() {
  const [hours, setHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [results, setResults] = useState(
    /** @type {{ regularPay: number, overtimePay: number, totalPay: number, tax: number } | null} */ (null)
  );

  function calculatePay() {
    if (!hours.trim() || !hourlyRate.trim() || !taxRate.trim()) {
      Alert.alert('Missing information', 'Please fill in all three fields.');
      return;
    }

    const hoursWorked = Number(hours);
    const rate = Number(hourlyRate);
    const taxPercentage = Number(taxRate);

    if (
      !Number.isFinite(hoursWorked) ||
      !Number.isFinite(rate) ||
      !Number.isFinite(taxPercentage) ||
      hoursWorked < 0 ||
      rate < 0 ||
      taxPercentage < 0 ||
      taxPercentage > 100
    ) {
      Alert.alert(
        'Invalid information',
        'Enter valid non-negative numbers. The tax rate must be between 0 and 100.'
      );
      return;
    }

    const regularPay = Math.min(hoursWorked, 40) * rate;
    const overtimePay = Math.max(hoursWorked - 40, 0) * rate * 1.5;
    const totalPay = regularPay + overtimePay;
    const tax = regularPay * (taxPercentage / 100);

    setResults({ regularPay, overtimePay, totalPay, tax });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>Pay Calculator</Text>
      <Text style={styles.subtitle}>
        Overtime is paid at 1.5× the hourly rate for hours over 40.
      </Text>

      <Text style={styles.label}>Hours worked</Text>
      <TextInput
        style={styles.input}
        value={hours}
        onChangeText={setHours}
        placeholder="e.g. 42"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Hourly rate ($)</Text>
      <TextInput
        style={styles.input}
        value={hourlyRate}
        onChangeText={setHourlyRate}
        placeholder="e.g. 20"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Tax rate (%)</Text>
      <TextInput
        style={styles.input}
        value={taxRate}
        onChangeText={setTaxRate}
        placeholder="e.g. 15"
        keyboardType="decimal-pad"
      />

      <Pressable style={styles.button} onPress={calculatePay}>
        <Text style={styles.buttonText}>Calculate Pay</Text>
      </Pressable>

      {results && (
        <View style={styles.resultsCard}>
          <Text style={styles.resultsTitle}>Results</Text>
          <ResultRow label="Pay" value={results.regularPay} />
          <ResultRow label="Overtime pay" value={results.overtimePay} />
          <ResultRow label="Total pay" value={results.totalPay} />
          <ResultRow label="Tax" value={results.tax} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f6fb',
    padding: 24,
    paddingTop: 28,
  },
  title: {
    color: '#183153',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#53657d',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  label: {
    color: '#26364a',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#cbd5e1',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 17,
    marginBottom: 20,
    padding: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2463eb',
    borderRadius: 10,
    marginTop: 4,
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  resultsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 28,
    padding: 18,
  },
  resultsTitle: {
    color: '#183153',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultRow: {
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  resultLabel: {
    color: '#405168',
    fontSize: 16,
  },
  resultValue: {
    color: '#183153',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
