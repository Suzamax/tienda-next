/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Input, Heading, Box } from 'theme-ui';

import React, { useState } from 'react';
import Head from 'next/head';
import { fetchAPI } from '../lib/api';
import Layout from '../components/Layout';
import { NextSeo } from 'next-seo';
import BrandList from '../components/BrandList';

const Home = ({ homepage }) => {
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
            placeholder="Write here a brand..."
          />
        </div>
      </Box>
      <BrandList search={query} />
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

export default Home;
