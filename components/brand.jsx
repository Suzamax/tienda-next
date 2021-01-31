const Brand = ({ brand }) => {
  return (
    <div>
      <h1 className="title">{brand.name}</h1>
      {brand.description}
    </div>
  );
};

export default Brand;
