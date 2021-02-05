/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Grid, Box, Heading } from 'theme-ui';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Markdown from 'react-markdown-it';
import Link from 'next/link';

const QUERY = gql`
  {
    brands {
      id
      name
      description
      slug
      picture {
        url
      }
    }
  }
`;

function BrandList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return 'Error loading brands';
  if (loading) return <h1>Fetching...</h1>;
  if (data.brands && data.brands.length) {
    //searchQuery
    const searchQuery = data.brands.filter((query) =>
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
                as={`/brand/${res.slug}`}
                href={`/brand?id=${res.slug}`}
                key={res.id}
              >
                <div>
                  <img
                    sx={{
                      maxWidth: 128,
                    }}
                    src={res.picture.url}
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
      return <h1>No Brands Found</h1>;
    }
  }
  return <h5>meow</h5>;
}
export default BrandList;
