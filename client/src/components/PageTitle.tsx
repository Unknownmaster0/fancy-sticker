interface propsType {
  title: String;
}

const PageTitle = ({ title }: propsType) => {
  return (
    <h1 className="text-5xl font-bold text-center mb-4 uppercase bg-clip-text bg-linear-to-r from-primary-neon via-accent-bright to-secondary-neon tracking-tight text-transparent">
      {title}
    </h1>
  );
};

export default PageTitle;
