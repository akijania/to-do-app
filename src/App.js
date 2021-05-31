import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import UserPage from "./components/views/UserPage/UserPage";
import Login from "./components/views/Login/Login";
import Registration from "./components/views/Registration/Registration";
import NotFound from "./components/views/PageNotFound/PageNotFound";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Registration} />
              <Route exact path="/:id" component={UserPage} />
              <Route path="*" component={NotFound} />
            </Switch>
          </MainLayout>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
