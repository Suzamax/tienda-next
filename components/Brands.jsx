import Brand from './brand';

import { fetchAPI } from '../lib/api';

const Brands = ({ brands, e }) => {
  if (e) return <div className="is-danger">An error occured: {e.message}</div>;
  if (brands === undefined) return <div>lmao</div>;
  return (
    <div>
      {brands.map((b) => (
        <Brand brand={b} />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const brands = await fetchAPI('/brands');

  return {
    props: { brands },
    revalidate: 1,
  };
}

export default Brands;
