import { View, StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12
  },
  listItem: {
    flexDirection: 'row'
  },
  listItemContent: {
  },
  bullet: {
    paddingRight: 4
  }
});

const bulletChar = '•'

export function UL(props: { items: string[] }) {
  const { items } = props;
  return <View style={styles.list}>
    {items.map((item, idx) => {
      return <View key={`list-item-${idx}`} style={styles.listItem}>
        <Text style={styles.bullet}>{bulletChar}</Text>
        <Text style={styles.listItemContent}>{item}</Text>
      </View>
    })}
  </View>
}
