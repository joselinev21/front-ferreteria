import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewMain from "../view/viewMain/ViewMain.jsx";
import ViewLogin from "../view/viewLogin/ViewLogin.jsx";
import ViewForgetPassword from "../view/viewForgetPassword/ViewForgetPassword.jsx";
import ViewForgetPasswordAction from "../view/viewForgetPassword/viewForgetPasswordAction/ViewForgetPasswordAction.jsx";
import ProtectedRoute from "./ProtecterRoute.jsx";
import ViewCreateProduct from "../view/viewProduct/viewCreateProduct/ViewCreateProduct.jsx";
import ViewProducts from "../view/viewProduct/ViewProduct.jsx";
import ViewListSuplier from "../view/viewSuplier/ViewListSuplier.jsx";
import ViewEditProduct from "../view/viewProduct/viewEditProduct/ViewEditProduct.jsx";
import ViewEditSuplier from "../view/viewSuplier/viewEditSuplier/ViewEditSuplier.jsx";
import ViewCreateSuplier from "../view/viewSuplier/viewCreateSuplier/viewCreateSuplier.jsx";
import ViewGenerateReport from "../view/viewGenerateReport/ViewGenerateReport.jsx";
import ViewReportDamageProduct from "../view/viewProduct/viewReportDamageProduct/ViewReportDamageProduct.jsx";
import ViewProcessPayment from "../view/viewProcessPayment/ViewProcessPayment.jsx";
import ViewSale from "../view/viewSale/ViewSale.jsx";
import ViewEditSale from "../view/viewSale/viewEditSale/ViewEditSale.jsx";
import ViewAddProject from "../view/viewProject/viewAddProject/ViewAddProject.jsx";

import ViewProject from "../view/viewProject/ViewProject.jsx";
import ViewDailyReport from "../view/viewDailyReport/ViewDailyReport.jsx";
import ViewEditProject from "../view/viewProject/viewEditProject/ViewEditProject.jsx";

import ViewEditPackage from "../view/viewEditPackage/ViewEditPackage.jsx";
import ViewAddPackage from "../view/viewAddPackage/ViewAddPackage.jsx";
import ViewListPackage from "../view/viewListPackage/viewListPackages.jsx";

import ViewOfferProduct from "../view/viewOfferProduct/ViewOfferProduct.jsx";
import ViewEditUser from "../view/viewEditUser/ViewEditUser.jsx";
import ViewAddUser from "../view/viewAddUser/ViewAddUser.jsx";
import ViewSettings from "../view/viewSettings/ViewSettings.jsx";
import ViewUser from "../view/viewUser/ViewUser.jsx";
import ViewListOffer from "../view/viewOfferProduct/viewListOffer/ViewListOffer.jsx";
import NotFound from "../view/notFound/index.jsx";
/*
  Según la lógica de negocio, tendremos 3 interfaces diferentes segun los roles, entonces debemos de validar
  que el usuario quiere ingresar al sistema tenga el permiso de entrar a esa pestalla. He creado el componente 
  ProtectedRouter que se encarga de validar si existen token y rol en nuestro localstorage, si no exiten este se encarga
  de redirigir al login, pero si los tiene, valida que el rol almacenado en nuestrol local sea igual al rol requerido
  
  pd -> En el caso de que no se requiera un rol, solo poner el componente dentro de la prop element

*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewMain />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <ViewLogin />,
  },
  {
    path: "/forget-password",
    element: <ViewForgetPassword />,
  },
  {
    path: "/forget-password-action",
    element: <ViewForgetPasswordAction />,
  },
  {
    path: "/edit-product/:id",
    element: <ViewEditProduct />,
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<ViewMain />} requiredRole="admin" />,
  },
  {
    path: "/edit-suplier/:id",
    element: <ViewEditSuplier />,
  },
  {
    path: "/create-product",
    element: <ViewCreateProduct />,
  },
  {
    path: "/products",
    element: <ViewProducts />,
  },
  {
    path: "/supliers",
    element: <ViewListSuplier />,
  },
  {
    path: "/create-suplier",
    element: <ViewCreateSuplier />,
  },
  {
    path: "/generate-report",
    element: <ViewGenerateReport />,
  },
  {
    path: "/report-damage-product",
    element: <ViewReportDamageProduct />,
  },
  {
    path: "/sale",
    element: <ViewSale />,
  },
  {
    path: "/edit-sale",
    element: <ViewEditSale />,
  },
  {
    path: "/proyecto/agregar",
    element: <ViewAddProject />,
  },
  {
    path: "/proyecto",
    element: <ViewProject />,
  },
  {
    path: "/daily-report",
    element: <ViewDailyReport />,
  },
  {
    path: "/edit-project",
    element: <ViewEditProject />,
  },
  {
    path: "/edit-package",
    element: <ViewEditPackage />,
  },
  {
    path: "/list-package",
    element: <ViewListPackage />,
  },
  {
    path: "/edit-project/:id",
    element: <ViewEditProject />,
  },
  {
    path: "/add-package",
    element: <ViewAddPackage />,
  },
  {
    path: "/list-package",
    element: <ViewListPackage />,
  },
  {
    path: "/offers",
    element: <ViewListOffer />,
  },
  {
    path: "/offer-product",
    element: <ViewOfferProduct />,
  },
  {
    path: "/users",
    element: <ViewUser />,
  },
  {
    path: "/edit-user",
    element: <ViewEditUser />,
  },
  {
    path: "/add-user",
    element: <ViewAddUser />,
  },
  {
    path: "/settings",
    element: <ViewSettings />,
  },
  
  {
    path: "/Report-demaged",
    element: <ViewReportDamageProduct/>

  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
