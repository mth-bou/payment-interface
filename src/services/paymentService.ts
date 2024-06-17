interface SendPaymentResponse {
  state: "success" | "error";
  amount: number;
  paymentMethod: string;
}

export const sendPayment = (amount: number, paymentMethod: string): Promise<SendPaymentResponse> => {
  return new Promise((resolve) => {
    console.log('Processing payment...');
    setTimeout(() => {
      resolve({
        state: "success",
        amount,
        paymentMethod,
      });
    }, 2000);
  });
};
