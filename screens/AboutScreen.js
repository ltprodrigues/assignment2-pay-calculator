import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>About</Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Leticia Rodrigues</Text>

        <Text style={styles.label}>Student ID</Text>
        <Text style={styles.value}>101559381</Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>Back to Pay Calculator</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f6fb',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
  },
  title: {
    color: '#183153',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    color: '#53657d',
    fontSize: 15,
    marginBottom: 4,
  },
  value: {
    color: '#183153',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2463eb',
    borderRadius: 10,
    marginTop: 16,
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});