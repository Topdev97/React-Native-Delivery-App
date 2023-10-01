import { StyleSheet, Text, View } from 'react-native';



export default function TabTwoScreen() {
  return (
    <View className='flex-1 justify-center items-center bg-red-500'>
      <Text className='text-red-500 font-extrabold'>tailwind css</Text>
      <View className='flex-1 items-center justify-center bg-white"' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
