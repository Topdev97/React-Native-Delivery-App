import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { RAZOR_PAY_ID } from "@env"

export default function RazorpayButton() {

  const runBeforeFirst = `
    window.isNativeApp = true;
    true; // note: this is required, or you'll sometimes get silent failures
    
  `;

  const customHTML = `<html>
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
  <style>
  #rzp-button1 {
    width: 100%;
    padding: 0;
    border: none;
    background-color: ${Colors.primary};
    border-radius: 8px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Apply the specified text styles to the button text */
  #rzp-button1 span {
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
</style>

<button id="rzp-button1"><span>Order Now ${RAZOR_PAY_ID}</span></button>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  <script>
    var options = {
      "key": "rzp_test_d4s8KAltmadVnz", 
      "amount": "1000",
      "currency": "INR",
      "description": "Acme Corp",
      "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
      "prefill":
      {
        "email": "gaurav.kumar@example.com",
        "contact": +919900000000,
      },
      "handler": function (response) {
        alert(response);
      },
    };
    var rzp1 = new Razorpay(options);
    document.getElementById('rzp-button1').onclick = function (e) {
      rzp1.open();
      rzp1.on('payment.failed', function (response){
        window.ReactNativeWebView.postMessage(JSON.stringify(response));
        true
      });
      e.preventDefault();
    }
  </script>
  </html>`
  
  return (
    <View style={styles.container}>
      <WebView
        style={styles.footer}
        source={{
          html: customHTML
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        // injectedJavaScript={runFirst}
        injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
        onMessage={(event) => {
          console.log(event.nativeEvent.data);
          const data = JSON.parse(event.nativeEvent.data);
          console.log(data);
          if (data.error) {
            alert('Payment failed');
          } else {
            alert('Payment successful');
          }
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex:1
  },
  webview: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
});
