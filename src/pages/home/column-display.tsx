import { Card, Grid, Form, Label } from "semantic-ui-react";
import { DisplayType } from ".";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
  rating?: number;
  datecheck?: boolean;
}
interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}
export const ColumnDisplay = (props: Props) => {
  const { data, displayType, isRated } = props;
  const [rating, setRating] = useState<number>(0);

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => rateMovie(id, rating),
    onSuccess: () => {
      toast.success("Successfully Rated!");
    },
    onError: () => {
      toast.success("Error in Rating!");
    },
  });

  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ["rateTvShow"],
    mutationFn: (id: number) => rateTvShow(id, rating),
    onSuccess: () => {
      toast.success("Successfully Rated!");
    },
    onError: () => {
      toast.success("Error in Rating!");
    },
  });

  const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvShowMutation;


    data.map((displayData: DisplayData) => {
        const givenDate = new Date(displayData.release_date);
        const currentDate = new Date();
        if (givenDate < currentDate) {
            displayData.datecheck = true;
            } 
        else if (givenDate === currentDate) {
            displayData.datecheck = true;
            }
        else {
            displayData.datecheck = false;
        }
    });

    


  return (
    <div>
      <Grid
        columns={3}
        padded="vertically"
        stackable
        centered
        verticalAlign="top"
      >
        {data.map((displayData: DisplayData) => (
          <Grid.Column key={displayData.id}>
            <Card.Group>
              <Link
                to={`/${
                  displayType === DisplayType.Movies ? "movie" : "tvshow"
                }/${displayData.id}`}
              >
                <Card
                  style={{ height: 820 }}
                  fluid
                  image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                  header={
                    displayType === DisplayType.Movies
                      ? displayData.title
                      : displayData.name
                  }
                  meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average}`}
                  description={displayData.overview.slice(0, 300) + "..."}
                />
                {isRated && (
                  <Label color="blue">
                    {" "}
                    Your Rating : {displayData.rating}
                  </Label>
                )}
              </Link>
              {displayData.datecheck &&
               <Form style={{ marginTop: 10 }}>
                <Form.Group inline>
                  <Form.Field>
                    <Form.Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      onChange={(e) => setRating(Number(e.target.value))}
                      action={{
                        color: "blue",
                        labelPosition: "right",
                        icon: "star",
                        content: "Rate",
                        onClick: () => rate(displayData.id),
                      }}
                    ></Form.Input>
                  </Form.Field>
                </Form.Group>
              </Form>
              }
            </Card.Group>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};
