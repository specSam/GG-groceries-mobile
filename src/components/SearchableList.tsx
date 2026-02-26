import React, {useState, useMemo} from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import {COLORS} from '../Theme';

type SearchableListProps = {
    options: string[];
    onSelect: (value: string) => void;
    placeholder?: string;
    showBeforeSearch: boolean;
};

const SearchableList: React.FC<SearchableListProps> = ({
    options,
    onSelect,
    placeholder = '',
    showBeforeSearch,
}) => {
    const [searchText, setSearchText] = useState('');

    const filteredOptions = useMemo(() => {
        if (!searchText && !showBeforeSearch) {
            return [];
        }
        if (!searchText) {
            return options;
        }
        const lower = searchText.toLowerCase();
        return options.filter(option =>
            option.toLowerCase().includes(lower),
        );
    }, [searchText, options, showBeforeSearch]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder={placeholder}
                value={searchText}
                onChangeText={setSearchText}
            />
            <FlatList
                style={styles.list}
                data={filteredOptions}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => onSelect(item)}>
                        <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: COLORS.darkText,
    },
    list: {
        marginTop: 2,
    },
    option: {
        backgroundColor: COLORS.white,
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

export default SearchableList;
