import React from "react";
import MyButton from "../../util/myButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

function LikeButton(props) {
  const { authenticated } = props.user;
  const likedScream = () => {
    if (
      props.user.likes &&
      props.user.likes.find((like) => like.screamId === props.screamId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const likeScream = () => {
    props.likeScream(props.screamId);
  };

  const unlikeScream = () => {
    props.unlikeScream(props.screamId);
  };
  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Unlike" onClick={unlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  return likeButton;
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
