import { wrapper } from "@/redux/store";
import "@/styles/globals.css";
import jwtDecode from "jwt-decode";
import { Provider, useDispatch, useSelector } from "react-redux";

function MyApp({ Component, ...rest }) {
  const { user } = rest.props;
  // const dispatch = useDispatch();
  // dispatch({ type: "SET_USER", payload: user });
  const { store, props } = wrapper.useWrappedStore(rest);
  store.dispatch({ type: "SET_USER", payload: user });
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const token = ctx.req.cookies.auth_token;

  return {
    props: {
      user: token ? await jwtDecode(token).user : null,
    },
  };
};

export default MyApp;
