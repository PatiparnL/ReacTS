import { makeStyles } from "@material-ui/core/styles";

 const LayoutStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 101,
    color: "#fff",
  },
}));
export default LayoutStyles;