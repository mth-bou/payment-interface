
const Header = () => {
  return (
    <header className="bg-background w-full p-4 text-white border-b">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl">Payment Interface</h1>
          <div className="flex align-middle">
            <p className="text-muted-foreground mr-2 self-center">Credentials : Satoshi Nakamoto</p>
          </div>
      </div>
    </header>
  );
};

export default Header;
