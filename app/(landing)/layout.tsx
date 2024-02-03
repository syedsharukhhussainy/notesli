const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default LandingLayout;
