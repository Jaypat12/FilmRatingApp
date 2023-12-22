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
  Embed
} from "semantic-ui-react";
import { fetchMovieDetails, fetchMovieVideoDetails } from "./query";
import { useQuery } from "@tanstack/react-query";

export const Movie = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Invalid Movie Id</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: movieData, isLoading: isLoadingMovieDetails } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: movieVideos, isLoading: isLoadingMovieVideos } = useQuery({
    queryKey: ["movieVideos"],
    queryFn: () => fetchMovieVideoDetails(id),
  });

  if (isLoadingMovieDetails || isLoadingMovieVideos) {
    return <Loader active />;
  }


  console.log(movieVideos.results);

  const list = movieVideos.results.find((video: any ) => {
        if(video.type === "Trailer" && video.site === "YouTube"){
          return video;
        }
      }
    );
  console.log(list.key)
  

  return (
    <div style={{ marginTop: 50 }}>
      <Segment >
        <Header style={{color:"blue"}}> {movieData.title} </Header>
        <Grid column={3} divided textAlign="left" style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column width={4}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <List>
                <List.Item>
                  <List.Header>Rated R: </List.Header>
                  {movieData.adult ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  <List.Header>Language: </List.Header>
                  {movieData.original_language}
                </List.Item>
                <List.Item>
                  <List.Header>Runtime: </List.Header>
                  {movieData.runtime}
                </List.Item>
                <List.Item>
                  <List.Header>Popularity: </List.Header>
                  {movieData.popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Genre: </List.Header>
                  {movieData.genres.map((g: any) => (
                    <Label key={g.id}> {g.name} </Label>
                  ))}
                </List.Item>
                <List.Item>
                  <List.Header>Rating: </List.Header>
                  {movieData.vote_average}
                </List.Item>
                <List.Item>
                  <List.Header>Production: </List.Header>
                  {movieData.production_companies.map((c: any) => c.name).join(", ")}
                </List.Item>
                <List.Item>
                  <List.Header>Budget: </List.Header>${movieData.budget}
                </List.Item>
                <List.Item>
                  <List.Header>Revenue: </List.Header>${movieData.revenue}
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <div>
                <Embed
                id={list.key}
                placeholder={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
                source='youtube'
                aspectRatio='4:3'
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
