
const WelcomeMessage = ({ username }: { username: string }) => {
  return (
    <div className="mt-6 py-2 flex justify-center">
      <p>Bienvenue {username}</p>
    </div>
  );
};

export default WelcomeMessage;
