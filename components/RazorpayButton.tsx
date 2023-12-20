import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { Alert, StyleSheet, View } from "react-native";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { postOrder } from "@/core/services/home";
import { useNavigation } from "@react-navigation/native";
import useBasketStore from "@/store/basketStore";
import { ToastAndroid } from "react-native";

export default function RazorpayButton() {
  const webViewRef = useRef<WebView | any>(null);
  const { orderTotal, data } = useLocalSearchParams();

  const navigate = useNavigation();
  const finalData = JSON.parse(data);

  const { clearCart } = useBasketStore();

  const order = postOrder({
    onSuccess: () => {
      ToastAndroid.showWithGravity(
        "Order Placed Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      clearCart();
      navigate.goBack();
    },
  });

  const customHTML = `<!DOCTYPE html>
  <html>
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
              height: 90vh;
              overflow: hidden;
          }
  
          #total-amount {
              color: ${Colors.primary};
              font-size: 24px;
              margin-top: 20px;
              text-align: center;
              display:none;
          }
  
          #rzp-button1 {
            width: 94%;
              margin: 0px 12px;
              padding: 0;
              border: none;
              z-index: 111;
              background-color: ${Colors.primary}; 
              border-radius: 8px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              padding: 0px 16px;
              text-align: center;
              display:none;
          }
  
          /* Apply the specified text styles to the button text */
          #rzp-button1 span {
              color: #fff;
              font-weight: bold;  
              font-size: 16px;
          }
          #bg{
           box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.1); /* Box shadow at the top */
           position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              padding-top: 15px;
          }
      </style>
  </head>
  <body>
      <div id="text-center">
          <div id="total-amount">Total Amount: ₹${orderTotal}</div>
      </div>
  <div id="bg">
      <button id="rzp-button1"><span>Choose Payment Method</span></button>
  </div>
  
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <script>
          var options = {
              "key": "rzp_test_d4s8KAltmadVnz",
              "amount": ${Number(orderTotal) * 100},
              "currency": "INR",
              "description": "Acme Corp",
              "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
              "prefill": {
                  "email": "gaurav.kumar@example.com",
                  "contact": +919900000000,
              },
              "handler": function (response) {
                window.ReactNativeWebView.postMessage(JSON.stringify(response));
                true
              },
              "theme": {
                  "color": "${Colors.primary}",
                  "backdrop_color": "#ffffff",
                  "hide_topbar": "true",
              }
          };
          var rzp1 = new Razorpay(options);
          document.getElementById('rzp-button1').onclick = function (e) {
              rzp1.open();
              rzp1.on('payment.failed', function (response) {
                  window.ReactNativeWebView.postMessage(JSON.stringify(response));
                  true
              });
              e.preventDefault();
          }
          function openRazorpay() {
            rzp1.open();
            rzp1.on('payment.failed', function (response) {
              window.ReactNativeWebView.postMessage(JSON.stringify(response));
              true
          });
          e.preventDefault();
          }
    
          openRazorpay();
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
        originWhitelist={["*"]}
        onMessage={(event) => {
          console.log(event.nativeEvent.data);
          const data = JSON.parse(event.nativeEvent.data);
          console.log(data);
          if (data.error) {
            Alert.alert(
              "Alert",
              "Your payment was failed",
              [{ text: "OK", onPress: () => navigate.goBack() }],
              { cancelable: false }
            );
          } else {
            order.mutate({
              ...finalData,
              payment_type: "online",
              payment_status: "true",
            });
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
