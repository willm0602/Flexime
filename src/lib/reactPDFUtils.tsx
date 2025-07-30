// biome-ignore lint/style/useImportType: needed to compile TSX for tests
import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 12,
    },
    listItem: {
        flexDirection: 'row',
    },
    listItemContent: {},
    bullet: {
        paddingRight: 4,
    },
});

const bulletChar = '•';

export function UL(props: { items: React.ReactNode[] | undefined }) {
    const items = props.items || [];
    return (
        <View style={styles.list}>
            {items.map((item) => {
                return (
                    <View
                        key={`list-item-${item?.toString()}`}
                        style={styles.listItem}
                    >
                        <Text style={styles.bullet}>{bulletChar}</Text>
                        <Text style={styles.listItemContent}>{item}</Text>
                    </View>
                );
            })}
        </View>
    );
}
