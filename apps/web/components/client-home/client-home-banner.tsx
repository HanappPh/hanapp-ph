const PromoBanner = ({ userName }: { userName: string }) => {
  return (
    <div className="bg-primary text-primary-foreground px-4 pb-6 pt-2">
      <h2 className="text-xl font-semibold mb-4">
        Ano <span className="text-warning">Hanapp</span> mo, {userName}?
      </h2>

      <div className="relative bg-gradient-to-r from-secondary/90 to-muted/80 rounded-2xl p-6 overflow-hidden shadow-lg">
        <div className="relative z-10">
          <p className="text-foreground text-base font-semibold mb-1">
            Invite a friend and claim your
          </p>
          <p className="text-foreground text-2xl font-bold">50% off voucher!</p>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
          <div className="text-6xl font-bold text-foreground">
            Hanapp<span className="text-warning">®</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
