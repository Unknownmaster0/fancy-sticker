interface propsType {
  title: String;
}

const PageTitle = ({ title }: propsType) => {
  return <h1 className="page-title">{title}</h1>;
};

export default PageTitle;
