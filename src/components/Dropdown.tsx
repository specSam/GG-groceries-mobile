import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import {COLORS} from '../Theme';

type DropdownProps = {
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
    placeholder?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
    options,
    selectedValue,
    onSelect,
    placeholder = 'Select...',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setIsOpen(!isOpen)}>
                <Text style={styles.buttonText}>
                    {selectedValue || placeholder}
                </Text>
                <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={options}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => {
                                    onSelect(item);
                                    setIsOpen(false);
                                }}>
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.darkText,
    },
    arrow: {
        fontSize: 12,
        color: COLORS.darkText,
    },
    listContainer: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 6,
        marginTop: 2,
        maxHeight: 150,
    },
    option: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    optionText: {
        fontSize: 16,
        color: COLORS.darkText,
    },
});

export default Dropdown;
