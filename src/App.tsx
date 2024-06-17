import Header from "@/components/section/Header.tsx";
import PaymentForm from "@/components/payment/PaymentForm.tsx";
import { useAuth } from "@/context/AuthContext.tsx";

function App() {
  const { isAuthenticated, username } = useAuth();

  console.log(isAuthenticated);
  console.log(username);

  return (
    <div className="bg-background">
      <Header />
      <PaymentForm />
    </div>
  )
}

export default App
