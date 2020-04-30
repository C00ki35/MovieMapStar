import React from "react";
import axios from "axios";
import ErrorHandler from "./ErrorHandler";
import { Grid, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    flexDirection: "column",
    alignItems: "center",
  },
  favourite: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
    align: "center",
    fontSize: "1.2em",
  },
  heroContent: {
    background: "linear-gradient(30deg, #A8D0DB 30%, #5E548E 95%)",
    padding: theme.spacing(4, 0, 3),
  },
  media: {
    width: 322,
    height: 322,
    objectFit: "contain",
  },
  cardContent: {
    flexGrow: 1,
  },
  genreImage: {
    margin: theme.spacing(2),
    width: "80px",
    height: "120px",
    borderRadius: "10px",
    boxShadow: " 2px 3px 5px black",
  },
  mainbg: {
    background: "linear-gradient(30deg, #A8D0DB 30%, #5E548E 95%)",

    color: "white",
  },
  badges: {
    backgroundColor: "#A8D0DB",
    height: "100vh",
  },
  badgeItems: {
    borderTop: "1px solid #747C92",
    height: "60px",
    display: "flex",
    flexDirection: "row",
    padding: "3px",
    backgroundColor: "#f3EDE2",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  visitInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  avatarInfo: {
    display: "flex",
    flexDirection: "row",
  },
  rank: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  badgeArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

class Profile extends React.Component {
  state = {
    profile: {},
    genres: [],
    error: null,
  };

  fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_aws_invokeURL}/user/${this.props.auth.user.username}`
      );
      const profile = res.data;
      this.setState({ profile: profile });
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

        <main>
          <div className={classes.mainbg}>
            <div className={classes.heroContent}>
              <Container maxWidth="xs">
                <Typography
                  component="h4"
                  variant="h4"
                  align="center"
                  gutterBottom
                >
                  <div style={{ textAlign: "center", fontSize: "1.5em" }}>
                    {`Hello ${this.state.profile.username}`}{" "}
                  </div>
                </Typography>
                <Grid className={classes.avatarInfo} maxWidth="xs">
                  <Grid item xs={5}>
                    <div className={classes.root}>
                      <img
                        style={{
                          width: "120px",
                          height: "120px",
                        }}
                        src={require("./images/starw.png")}
                        alt="avatar"
                      />
                    </div>
                  </Grid>
                  <Grid className={classes.rank} item xs={6}>
                    <div style={{ textAlign: "center", fontSize: "1.5em" }}>
                      Current ranking:
                    </div>
                    <div className={classes.badgeArea}>
                      <div className={classes.root}>
                        <img
                          style={{ width: "60px", height: "80px" }}
                          src={require("./images/currentRank.svg")}
                          alt="medal"
                        />
                      </div>
                      <div style={{ textAlign: "center", fontSize: "5em" }}>
                        67
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </div>

            <Container component="main" maxWidth="xs">
              <Grid
                className={classes.sectionheader}
                color="primary"
                item
                xs={12}
              >
                <Divider />
                <Typography className={classes.favourite} component="h6">
                  Favourite Films
                </Typography>
              </Grid>
              <Grid container xs={12}>
                {cards.map((card, index) => {
                  return (
                    <Grid item xs={4}>
                      <img
                        className={classes.genreImage}
                        src={`https://pgcdigit.co.uk/movieappimages/${card}.jpg`}
                        alt="avatar"
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
            <div className={classes.badges}>
              <Grid className={classes.badgeItems} container xs={12}>
                <Grid className={classes.badge} xs={3}>
                  <img
                    width="40px"
                    src={require("./images/popcom.png")}
                    alt="badge"
                  />
                </Grid>
                <Grid className={classes.visitInfo} xs={7}>
                  First person to get here!
                </Grid>
              </Grid>

              <Grid className={classes.badgeItems} container xs={12}>
                <Grid className={classes.badge} xs={3}>
                  <img
                    width="40px"
                    src={require("./images/jv.png")}
                    alt="badge"
                  />
                </Grid>
                <Grid className={classes.visitInfo} xs={7}>
                  Visited a Horror location!
                </Grid>
              </Grid>

              <Grid className={classes.badgeItems} container xs={12}>
                <Grid className={classes.badge} xs={3}>
                  <img
                    width="40px"
                    src={require("./images/aircraft-engine.png")}
                    alt="badge"
                  />
                </Grid>
                <Grid className={classes.visitInfo} xs={7}>
                  Visted over 40 locations
                </Grid>
              </Grid>

              <Grid className={classes.badgeItems} container xs={12}>
                <Grid className={classes.badge} xs={3}>
                  <img
                    width="40px"
                    src={require("./images/icon1.ico")}
                    alt="avatar"
                  />
                </Grid>
                <Grid className={classes.visitInfo} xs={7}>
                  Visited most of something
                </Grid>
              </Grid>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default withStyles(useStyles)(Profile);
