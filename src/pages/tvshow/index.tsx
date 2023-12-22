/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "react-router-dom";
import {
  Grid,
  Header,
  Loader,
  Segment,
  Image,
  List,
  Label,
  Accordion,
  Card,
} from "semantic-ui-react";
import { fetchTvShowDetails } from "./query";
import { useQuery } from "@tanstack/react-query";

export const TvShow = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Invalid Tv Show Id</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = useQuery({
    queryKey: ["tvShow"],
    queryFn: () => fetchTvShowDetails(id),
  });

  

  if (isLoading) {
    return <Loader active />;
  }

  const seasonPanels = data.seasons.map((s: any) => ({
    key: s.id,
    title: `Season ${s.season_number}`,
    content: {
      content: (
        <Card
          style={{ height: "70px" }}
          meta={s.air_date}
          description={`${s.episode_count} episodes`}
        />
      ),
    },
  }));

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header> {data.name} </Header>
        <Grid column={2} divided textAlign="left" style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                <List.Item>
                  <List.Header>Created By: </List.Header>
                  <List.Description>
                    {data.created_by.map((c: any) => c.name).join(", ")}
                  </List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Language: </List.Header>
                  {data.original_language}
                </List.Item>
                <List.Item>
                  <List.Header>Air Date: </List.Header>
                  {data.first_air_date}
                </List.Item>
                <List.Item>
                  <List.Header>Number of Episodes: </List.Header>
                  {data.number_of_episodes}
                </List.Item>
                <List.Item>
                  <List.Header>Number of Seasons: </List.Header>
                  {data.number_of_seasons}
                </List.Item>
                <List.Item>
                  <List.Header>Seasons: </List.Header>
                  <List.Description
                    style={{ height: "200px", overflowY: "scroll" }}
                  >
                    <Accordion
                      defaultActiveIndex={0}
                      panels={seasonPanels}
                      styled
                    />
                  </List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Popularity: </List.Header>
                  {data.popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Genre: </List.Header>
                  {data.genres.map((g: any) => (
                    <Label key={g.id}> {g.name} </Label>
                  ))}
                </List.Item>
                <List.Item>
                  <List.Header>Networks: </List.Header>
                  {data.networks.map((n: any) => (
                    <Image
                      key={n.id}
                      src={`https://image.tmdb.org/t/p/original/${n.logo_path}`}
                      size="small"
                      style={{ marginRight: 10 }}
                    />
                  ))}
                </List.Item>
                <List.Item>
                  <List.Header>Rating: </List.Header>
                  {data.vote_average}
                </List.Item>
                <List.Item>
                  <List.Header>Production: </List.Header>
                  {data.production_companies.map((c: any) => c.name).join(", ")}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
