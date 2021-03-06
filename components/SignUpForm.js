import React, { Component } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

const ROOT_URL = 'https://us-central1-one-time-password-60645.cloudfunctions.net';
// local 'http://localhost:5002/one-time-password-60645/us-central1'

class SignUpForm extends Component {
  state = { phone: '', error: '' };

  handleSubmit = async () => {
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone });
    } catch (err) {
      console.log(err.message);
      this.setState({ error: 'Something went wrong, please try again' });
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <Button
          title="submit"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default SignUpForm;
