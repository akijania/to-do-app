import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import './styles/global.scss';
import  MainLayout  from './components/layout/MainLayout/MainLayout';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <MainLayout>
          <Switch>
            {/* <Route exact path='/' component={Login} />
            <Route exact path='/:id' component={UserPage} />
            <Route exact path='/register' component={Register} />
            <Route path='*' component={NotFound} /> */}
          </Switch>
        </MainLayout>
      </BrowserRouter>

    </div>
  );
}

export default App;
