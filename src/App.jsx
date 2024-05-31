import "./App.css";
import { useEffect } from "react";
import { Router_app } from "./config/Router_app";
import { useDispatch, useSelector } from "react-redux";
import { CustomLoader } from "./component/CustomLoader";
import { auth_check } from "./authMethod/Auth_funcion";
import { stop_loader } from "./store/slices/loaderSlice";

function App() {
  const { loader } = useSelector((store) => store.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    auth_check(dispatch).then(() => {
      setTimeout(() => {
        dispatch(stop_loader(false));
      }, 2000);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(stop_loader(false));
    }, 2000);
  }, [loader]);

  // return <CustomLoader />;
  return loader ? <CustomLoader /> : <Router_app />;
}

export default App;
