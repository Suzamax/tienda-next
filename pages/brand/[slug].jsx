/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Input, Heading, Box } from 'theme-ui';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { fetchAPI } from '../../lib/api';
import ProductList from '../../components/ProductList';

const Home = ({ homepage }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [query, updateQuery] = useState('');

  return (
    <div>
      <Head>
        <title>Nextop</title>
      </Head>
      <Box p={4} bg="gray">
        <div className="search">
          <Input
            p={1}
            bg="muted"
            onChange={(e) => updateQuery(e.target.value.toLocaleLowerCase())}
            value={query}
            placeholder="Write here a product..."
          />
        </div>
      </Box>
      <ProductList search={query} />
    </div>
  );
};

export async function getStaticProps() {
  const homepage = await fetchAPI('/homepage');
  return {
    props: { homepage },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const brands = await fetchAPI('/brands');

  return {
    paths: brands.map((b) => ({
      params: {
        slug: b.slug,
      },
    })),
    fallback: false,
  };
}

export default Home;
