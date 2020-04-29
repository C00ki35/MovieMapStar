import React from "react";
import AppBar from "@material-ui/core/AppBar";
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
    width: "90%",
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
    if (this.state.genres.length === 3 && !this.state.genres.includes(name)) {
      this.setState((currentState) => {
        return {
          genres: [...currentState.genres],
          error: '"Sorry, you can only pic 3 genres"',
        };
      });
    } else if (this.state.genres.includes(name)) {
      const newState = [...this.state.genres];
      newState.splice(newState.indexOf(name), 1);
      this.setState({ genres: [...newState], error: "", [name]: "" }, () => {});
    } else {
      this.setState((currentState) => {
        return {
          genres: [...currentState.genres, name],
          error: "",
          [name]: "#DB5375",
        };
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <AppBar position="relative"></AppBar>
        <main>
          <Container
            className={classes.genreSelections}
            component="main"
            maxWidth="xs"
          >
            <Container xs={12}>
              <Typography
                component="h3"
                variant="h5"
                align="center"
                color="primary"
              >
                First, pick 3 genres ...
              </Typography>
            </Container>
            <Grid container xs={12} spacing={2} className={classes.genreImages}>
              {this.state.error ? (
                <Grid item xs={12} style={{ color: "#DB5375" }}>
                  {this.state.error}
                </Grid>
              ) : null}
              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("horror");
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
                    image={require("./images/genres/horror.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("action");
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
                    image={require("./images/genres/action.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("animation");
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
                    image={require("./images/genres/animation.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("romance");
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
                    image={require("./images/genres/romance.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("scifi");
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
                    image={require("./images/genres/sci-fi.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("drama");
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
                    image={require("./images/genres/drama.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("western");
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
                    image={require("./images/genres/western.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("adventure");
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
                    image={require("./images/genres/adventure.jpg")}
                  />
                </Card>
              </Grid>

              <Grid
                className={classes.genreImages}
                item
                xs={4}
                onClick={() => {
                  this.selectGenre("thriller");
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
                    image={require("./images/genres/thriller.jpg")}
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
