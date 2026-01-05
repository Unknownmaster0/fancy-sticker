const Price = ({ currency, price }: { currency: string; price: string }) => {
  return (
    <>
      {currency}{"  "}
      <span>{price}</span>
    </>
  );
};

export default Price;
