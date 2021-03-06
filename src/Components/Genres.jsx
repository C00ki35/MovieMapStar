import React from "react";
import Card from "@material-ui/core/Card";
import { CardMedia, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = (theme) => ({
  submitbutton: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  appBg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(0.25turn, #f12b6a, #f2a041)",
    height: "90px",
  },
  genreSelections: {
    display: "flex",
    flexDirection: "column",
  },
  genreImages: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(1),
  },
  img: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageInfo: {
    width: "80%",
    height: "90%",
  },
});

class Genres extends React.Component {
  state = {
    genres: [],
    error: "",
    horror: "",
    action: "",
    animation: "",
    romance: "",
    scifi: "",
    comedy: "",
    thriller: "",
    adventure: "",
    western: "",
  };

  handleSubmit = (event) => {
    if (this.state.genres.length < 3) {
      this.setState({ error: "Sorry, pick 3 genres before clicking next" });
      event.preventDefault();
    } else {
      this.props.auth.userGenres(this.state.genres);
      this.props.history.push("/register");
    }
  };

  selectGenre = (name) => {
    const selectedGenre = name.split("-")[0];
    if (this.state.genres.length === 3 && !this.state.genres.includes(name)) {
      this.setState(
        (currentState) => {
          return {
            genres: [...currentState.genres],
            error: '"Sorry, you can only pic 3 genres"',
          };
        },
        () => {
          console.log(this.state.genres);
        }
      );
    } else if (this.state.genres.includes(name)) {
      const newState = [...this.state.genres];
      newState.splice(newState.indexOf(name), 1);
      this.setState(
        { genres: [...newState], error: "", [selectedGenre]: "" },
        () => {
          console.log(this.state.genres);
        }
      );
    } else {
      this.setState(
        (currentState) => {
          return {
            genres: [...currentState.genres, name],
            error: "",
            [selectedGenre]: "#DB5375",
          };
        },
        () => {
          console.log("THISS IS THE GENRE ", this.state.genres);
        }
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <main>
          <div className={classes.appBg}>
            <img
              src={require("./images/mapstar.png")}
              width="200px"
              alt="Mapstar logo"
            />
          </div>
          <Container
            className={classes.genreSelections}
            component="main"
            maxWidth="xs"
          >
            <Container xs={12}>
              <Typography
                component="h3"
                variant="body2"
                align="center"
                color="primary"
                style={{ paddingTop: "20px" }}
              >
                First, pick 3 genres ...
              </Typography>
            </Container>
            <Grid container xs={12} spacing={1} className={classes.genreImages}>
              {this.state.error ? (
                <Grid item xs={12} variant="body2" style={{ color: "#DB5375" }}>
                  <Typography
                    component="h3"
                    variant="body2"
                    align="center"
                    color="primary"
                  >
                    {this.state.error}
                  </Typography>
                </Grid>
              ) : null}

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("horror-tt0077651");
                }}
              >
                <Card
                  className={classes.img}
                  style={{ backgroundColor: this.state.horror }}
                >
                  <CardMedia
                    className={classes.imageInfo}
                    component="img"
                    alt="Horror genre"
                    image={require("./images/genres/horror-tt0077651.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("action-tt1206885");
                }}
              >
                <Card
                  className={classes.img}
                  style={{ backgroundColor: this.state.action }}
                >
                  <CardMedia
                    className={classes.imageInfo}
                    component="img"
                    alt="Action genre"
                    image={require("./images/genres/action-tt1206885.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("animation-tt1979376");
                }}
              >
                <Card
                  className={classes.img}
                  style={{ backgroundColor: this.state.animation }}
                >
                  <CardMedia
                    className={classes.imageInfo}
                    component="img"
                    alt="Animation genre"
                    image={require("./images/genres/animation-tt1979376.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("romance-tt0100405");
                }}
              >
                <Card
                  className={classes.img}
                  style={{ backgroundColor: this.state.romance }}
                >
                  <CardMedia
                    className={classes.imageInfo}
                    component="img"
                    alt="Romance genre"
                    image={require("./images/genres/romance-tt0100405.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("scifi-tt0076759");
                }}
              >
                <Card
                  className={classes.img}
                  style={{ backgroundColor: this.state.scifi }}
                >
                  <CardMedia
                    className={classes.imageInfo}
                    component="img"
                    alt="Sci-fi genre"
                    image={require("./images/genres/scifi-tt0076759.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("drama-tt0111161");
                }}
              >
                <Card
                  className={classes.img}
                  style={{ backgroundColor: this.state.drama }}
                >
                  <CardMedia
                    className={classes.imageInfo}
                    component="img"
                    alt="Drama genre"
                    image={require("./images/genres/drama-tt0111161.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("western-tt2404435");
                }}
              >
                <Card
                  className={classes.img}
                  style={{ backgroundColor: this.state.western }}
                >
                  <CardMedia
                    className={classes.imageInfo}
                    component="img"
                    alt="Western genre"
                    image={require("./images/genres/western-tt2404435.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("adventure-tt1790809");
                }}
              >
                <Card
                  className={classes.img}
                  style={{ backgroundColor: this.state.adventure }}
                >
                  <CardMedia
                    className={classes.imageInfo}
                    component="img"
                    alt="Adventure genre"
                    image={require("./images/genres/adventure-tt1790809.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("thriller-tt0073195");
                }}
              >
                <Card
                  className={classes.img}
                  style={{ backgroundColor: this.state.thriller }}
                >
                  <CardMedia
                    className={classes.imageInfo}
                    component="img"
                    alt="Thriller genre"
                    image={require("./images/genres/thriller-tt0073195.jpg")}
                  />
                </Card>
              </Grid>
              <Button
                className={classes.submitbutton}
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Next
              </Button>
            </Grid>
          </Container>
        </main>
      </>
    );
  }
}

export default withStyles(useStyles)(Genres);
