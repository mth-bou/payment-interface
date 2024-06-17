import Header from "@/components/section/Header.tsx";
import PaymentForm from "@/components/payment/PaymentForm.tsx";
import { useAuth } from "@/context/AuthContext.tsx";

function App() {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  return (
    <div className="bg-background">
      <Header />
      <PaymentForm />
    </div>
  )
}

export default App
