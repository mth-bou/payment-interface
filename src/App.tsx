import Header from "@/components/section/Header.tsx";
import PaymentForm from "@/components/payment/PaymentForm.tsx";
import { useAuth } from "@/context/AuthContext.tsx";
import WelcomeMessage from "@/components/WelcomeMessage.tsx";

function App() {
  const { isAuthenticated, username } = useAuth();

  return (
    <div className="dark min-h-screen bg-background">
      <Header />
      {isAuthenticated && username ? <WelcomeMessage username={username} /> : null}
      <PaymentForm />
    </div>
  )
}

export default App
