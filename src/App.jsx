import { useState, useEffect } from "react";
import Clientes from "pages/Admin/Clientes";
import Vehiculos from "pages/Admin/Vehiculos";
import PrivateLayout from "layouts/PrivateLayout";
import PublicLayout from "layouts/PublicLayout";
import Index from "pages/Index";
import Admin from "pages/Admin/Index";
import Resgistro from "pages/Resgistro";
import Login from "pages/auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "styles/styles.css";
import AuthLayout from "layouts/AuthLayout";
import { DarkModeContext } from "contex/darkMode";

function App() {
  const [darkMode, setdarkMode] = useState(false);
  useEffect(() => {
    console.log("modo dark: ", darkMode);
  }, [darkMode]);
  return (
    <div className='App'>
      <DarkModeContext.Provider value={{ darkMode, setdarkMode }}>
        <Router>
          <Switch>
            <Route path={["/admin", "/admin/vehiculos", "/admin/clientes"]}>
              <PrivateLayout>
                <Switch>
                  <Route path='/admin/clientes'>
                    <Clientes />
                  </Route>
                  <Route path='/admin/vehiculos'>
                    <Vehiculos />
                  </Route>
                  <Route path='/admin'>
                    <Admin />
                  </Route>
                </Switch>
              </PrivateLayout>
            </Route>
            <Route path={["/login", "/registro"]}>
              <AuthLayout>
                <Switch>
                  <Route path='/login'>
                    <Login />
                  </Route>
                  <Route path='/registro'>
                    <Resgistro />
                  </Route>
                </Switch>
              </AuthLayout>
            </Route>
            <Route>
              <PublicLayout>
                <Switch>
                  <Route path='/'>
                    <Index />
                  </Route>
                </Switch>
              </PublicLayout>
            </Route>
          </Switch>
        </Router>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
