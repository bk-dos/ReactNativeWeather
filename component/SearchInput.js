import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native'
import PropTypes from "prop-types"

const SearchInput = (props) => {
  const [text, setText] = useState('')

  const handleChangeText = (newText) => {
    setText(newText)
  }


  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        autoCorrect={false}
        placeholder={props.placeholder}
        placeholderTextColor="white"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={props.onSubmit}
      />
    </View>
  )
};

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

SearchInput.defaultProps = {
  placeholder: '',
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white'
  }
});

export default SearchInput;