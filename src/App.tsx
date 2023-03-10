import React, { createContext, useEffect } from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import useFruits from "./hook/useFruits";
import Card from "./components/Card";
import styled from "styled-components";
// import { useRef } from "react";

export interface bucket {
  name: string;
  quantity: number;
}

interface contextInt {
  virtualCart: bucket[] | undefined;
  setVirtualCart: React.Dispatch<React.SetStateAction<bucket[] | undefined>>;
  cart: bucket[] | undefined;
  showTotal: boolean;
  setShowTotal: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  overall: number;
  setOverall: React.Dispatch<React.SetStateAction<number>>;
  checkedOut: boolean;
  setCheckedOut: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 100px 280px;
`;

const Add = styled.button`
  width: 300px;
  height: 100px;
  background: orangered;
  border: orangered;
  cursor: pointer;
  font-size: 2rem;
  border-radius: 8px;
`;

export const context = createContext<contextInt>({
  virtualCart: [],
  setVirtualCart: () => null,
  cart: [],
  showTotal: false,
  setShowTotal: () => null,
  total: 0,
  setTotal: () => null,
  clicked: false,
  setClicked: () => null,
  overall: 0,
  setOverall: () => null,
  checkedOut: false,
  setCheckedOut: () => null,
});

const App: React.FC = (): JSX.Element => {
  const data = useFruits();

  const [virtualCart, setVirtualCart] = useState<bucket[] | undefined>([]);
  const [cart, setCart] = useState<bucket[] | undefined>([]);

  const [showTotal, setShowTotal] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [clicked, setClicked] = useState<boolean>(false);
  const [overall, setOverall] = useState<number>(0);
  // const totale = useRef<number>(0);
  const [checkedOut, setCheckedOut] = useState<boolean>(false);

  useEffect(() => {
    console.log(virtualCart);
    return () => {};
  }, [virtualCart]);

  const calculate = (): number => {
    let ov = 0;
    for (let x of data) {
      for (let y of virtualCart!) {
        if (y.name === x.name) {
          ov += y.quantity * x.price;
        }
      }
    }
    return ov;
  };

  const add2Cart = () => {
    let overall = 0;
    if (virtualCart) {
      setTotal(() => {
        let t = 0;
        if (virtualCart) {
          if (virtualCart.length !== 0) {
            virtualCart!.forEach((x) => {
              t += x.quantity;
            });
          }
        }
        return t;
      });
      setCart(virtualCart);
      overall = calculate();
    }
    setShowTotal(true);
    setClicked(true);
    setOverall(overall);
  };

  return (
    <div className="myBody">
      <context.Provider
        value={{
          virtualCart,
          setVirtualCart,
          cart,
          showTotal,
          setShowTotal,
          total,
          setTotal,
          clicked,
          setClicked,
          overall,
          setOverall,
          checkedOut,
          setCheckedOut,
        }}
      >
        <Navbar />
        <Container>
          {data &&
            data.map((x) => {
              return <Card name={x.name} price={x.price} />;
            })}
        </Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
          }}
        >
          <Add onClick={() => add2Cart()}>ADD TO CART</Add>
        </div>
      </context.Provider>
    </div>
  );
};

export default App;
