import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/material-kit-assets/jss/material-kit-react/components/parallaxStyle.js";
// @material-ui/core components

// core components

const useStyles = makeStyles(styles);

export default function Parallax(props) {
  let windowScrollTop;
  if (typeof window !== 'undefined' && window.innerWidth && window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth && window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (typeof window !== 'undefined' && window.innerWidth && window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });
  const resetTransform = () => {
    if (typeof window !== 'undefined' && window.pageYOffset){
      var windowScrollTop = window.pageYOffset / 3;
      setTransform("translate3d(0," + windowScrollTop + "px,0)");
    }
  };
  const { filter, className, children, style, image, small } = props;
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [className]: className !== undefined
  });
  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundImage: "url(" + image + ")",
        transform: transform,
      }}
    >
      {children}
    </div>
  );
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool
};
