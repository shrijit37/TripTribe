import "./App.css"
import Navbar from "./Components/Navbar/Navbar";
import Homepage from "./Components/Homepage/Homepage";
import Result from "./Components/Result/Result";
import Profile from "./Components/Profile/Profile";
import Review from "./Components/Reviews/Review";
import WriteReview from "./Components/Reviews/WriteReview";
import Register from "./Components/Register/Register";

// import { Route, Routes} from "react-router";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Homepage/>}>
  //       <Route path="profile" element={<Profile/>} />
  //     </Route>

  //   )
    // [
    //     {
    //         path:'/',
    //         element:<Homepage/>
    //     },
    //     {
    //         path:'/profile',
    //         element:<Profile />
    //     },
    //     {
    //         element:<Review/>
    //     }
    // ]
  // );


  const PageNotFound = ()=>{
   return ( <>
      <div className="page404container">
        <h1>404 : Page Not Found</h1>
      </div>
    </>)
  }
  return (
    <>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/result" element={<Result />} />
        <Route path="/review" element={<Review />} />
        <Route path="/writereview" element={<WriteReview />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>

  );
};

export default App;
