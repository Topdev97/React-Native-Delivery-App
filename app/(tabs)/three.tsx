import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import { RAZOR_PAY_ID } from "@env"

export default function RazorpayButton() {
  const webViewRef = useRef<WebView | any>(null);

  const runBeforeFirst = `
    window.isNativeApp = true;
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  const customHTML = `<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    <style>
      body {
        margin: 0;
        padding: 0 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100vh;
      }
      #total-amount {
        color: ${Colors.primary};
        font-size: 24px;
        margin-top: 20px;
        text-align: center;
      }
  
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
        margin-bottom: 20px;
        padding: 0px 16px;
        text-align: center;
      }
  
      /* Apply the specified text styles to the button text */
      #rzp-button1 span {
        color: #fff;
        font-weight: bold;
        font-size: 16px;
      }
    </style>
  </head>
  
  <body>
  <div id="text-center">
  <div id="total-amount">Total Amount: $1000</div>
  </div>
  
    <button id="rzp-button1"><span>Order Now ${RAZOR_PAY_ID}</span></button>
  
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script>
      var options = {
        "key": "rzp_test_d4s8KAltmadVnz",
        "amount": "1000",
        "currency": "INR",
        "description": "Acme Corp",
        "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
        "prefill": {
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
  </body>
  </html>
  `;
  
  
  
  return (
    <View style={styles.container}>
         <WebView
        ref={webViewRef}
        source={{
          html: customHTML,
        }}
        originWhitelist={['*']}
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
});
