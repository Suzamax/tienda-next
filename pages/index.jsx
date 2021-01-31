import React from 'react';
import Head from 'next/head';
import { fetchAPI } from '../lib/api';
import Brands from '../components/Brands';
import Layout from '../components/Layout';
import { NextSeo } from 'next-seo';

const Home = ({ brands, homepage }) => {
  return (
    <div>
      <Head>
        <title>Nextop</title>
      </Head>
      <Layout>
        <NextSeo
          title={homepage.seo.metaTitle}
          description={homepage.seo.metaDescription}
        />
        <h1>Nextop</h1>
        <Brands brands={brands} />
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  const brands = await fetchAPI('/brands');
  const homepage = await fetchAPI('/homepage');
  return {
    props: { brands, homepage },
    revalidate: 1,
  };
}

export default Home;
