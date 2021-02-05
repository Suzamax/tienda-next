/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Grid, Box, Heading } from 'theme-ui';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Markdown from 'react-markdown-it';
import { useRouter } from 'next/router';
import Link from 'next/link';

const QUERY = gql`
  query($slug: String!) {
    products(where: { brand: { slug: $slug } }) {
      id
      name
      description
      price
      slug
      pictures {
        url
      }
    }
  }
`;

function ProductList(props) {
  const router = useRouter();
  const { loading, error, data } = useQuery(QUERY, {
    variables: { slug: router.query.slug },
  });
  if (error) return 'Error loading products';
  if (loading) return <h1>Fetching...</h1>;
  if (data.products && data.products.length) {
    //searchQuery
    const searchQuery = data.products.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <Grid
          sx={{
            listStyle: 'none',
            display: 'grid',
            gridGap: 3,
            gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
            m: 0,
            px: 3,
            py: 4,
          }}
        >
          {searchQuery.map((res) => (
            <Box
              sx={{
                bg: 'muted',
                my: 3,
                mx: 2,
                p: 3,
                borderRadius: 10,
              }}
            >
              <Link
                as={`/product/${res.slug}`} // necesito un campo slug...
                href={`/product/${res.slug}`}
                key={res.id}
              >
                <div>
                  <img
                    sx={{
                      maxWidth: 128,
                    }}
                    src={res.pictures[0].url}
                  />
                  <div className="pa3">
                    <Markdown source={res.description} />
                  </div>
                </div>
              </Link>
            </Box>
          ))}
        </Grid>
      );
    } else {
      return <h1>No Products Found</h1>;
    }
  }
  return <h5>meow</h5>;
}
export default ProductList;
