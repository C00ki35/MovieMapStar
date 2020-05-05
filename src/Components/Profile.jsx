import React from "react";
import axios from "axios";
import ErrorHandler from "./ErrorHandler";
import { Grid, Avatar } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Loading from "./Loading";
import "../index.css";
import Posters from "./Posters";

const useStyles = (theme) => ({
  main: {
    padding: "30px 0px 30px 0px",
  },
  title: {
    display: "flex",
    justifyContent: "center",
  },
  heroContent: {
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: "#020122",
  },
  posters: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatarPosition: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

class Profile extends React.Component {
  state = {
    profile: {},
    genres: [],
    error: null,
    isLoading: true,
  };

  fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_aws_invokeURL}/user/${this.props.auth.user.username}`
      );
      const profile = res.data;
      this.setState({ profile: profile, isLoading: false });
    } catch (error) {
      const message =
        "We have not being able to fetch your profile, please log out and try again.";
      this.setState({
        error: { message },
      });
    }
  };

  componentDidMount() {
    this.props.auth.menuToggle(true);
    this.fetchProfile();
  }

  render() {
    const { classes } = this.props;
    const cards = [
      this.state.profile.genre1,
      this.state.profile.genre2,
      this.state.profile.genre3,
    ];

    return (
      <>
        <ErrorHandler apierrors={this.state.error} />
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <main>
            <div className={classes.main}>
              <Container component="main" maxWidth="sm">
                <Grid item xs={7} sm={7} md={7} className={classes.title}>
                  <Typography variant="h4" gutterBottom>
                    {`Hello ${this.state.profile.username}`}
                  </Typography>
                </Grid>

                <Grid container xs={12} sm={12} spacing={1}>
                  <Grid
                    item
                    className={classes.avatarPosition}
                    xs={4}
                    sm={4}
                    md={4}
                  >
                    <Avatar className={classes.orange}>N</Avatar>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8}>
                    <Typography variant="h6">What is MovieMapStar</Typography>

                    <Typography variant="body2">
                      subtitle1. Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </div>

            <div className={classes.heroContent}>
              <Container component="main" maxWidth="md">
                <Grid
                  item
                  style={{ color: "white", textAlign: "center" }}
                  xs={12}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Favourite Genres
                  </Typography>
                </Grid>
                <Grid container xs={12} sm={12}>
                  {cards.map((card, index) => {
                    return (
                      <Grid
                        style={{ display: "flex", justifyContent: "center" }}
                        key={index}
                        item
                        xs={4}
                        sm={4}
                        md={4}
                      >
                        <Posters postergenre={card} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Container>
            </div>
          </main>
        )}
      </>
    );
  }
}

export default withStyles(useStyles)(Profile);
