import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import routes from './routes'
import "./index.css";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter(routes);

document.body.style = 'background: #ababab; font-family: Verdana, Geneva, Tahoma, sans-serif;';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router}/>);
