import { wrapper } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
import "@/styles/globals.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

const App = ({ Component, ...rest }) => {
  const { props, store } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

App.getInitialProps = wrapper.getInitialAppProps((store) => (ctx) => {
  const token = ctx.ctx.req.cookies.auth_token || null;

  if (token) {
    store.dispatch(setUser(jwtDecode(token)));
  }
});

export default App;
