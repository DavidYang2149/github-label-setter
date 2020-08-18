import React from "react";
import Head from "next/head";
import Router from "next/router";
import Error from "next/error";
import axios from "axios";
import _ from "lodash";
import produce from "immer";
import moment from "moment";
import { DatePicker } from "antd";

export default function Home(props) {
  if (props.error) {
    return <Error statusCode={500} title={props.error.message} />;
  }
  //if (props.data.faultInfo) {
  //  return <Error statusCode={500} title={props.data.faultInfo.message} />;
  //}

  const targetDt = moment().subtract(1, "day").format("YYYYMMDD");
  //props.targetDt = targetDt;

  return (
    <div>
      <Head>
        <title>Diabetes Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-bold">당뇨 체크</h1>
      <div>
        <DatePicker
          defaultValue={moment(targetDt, "YYYYMMDD")}
          //defaultValue={moment(props.targetDt, "YYYYMMDD")}
          dateFormat={"YYYYMMDD"}
          onChange={(date) =>
            date !== null
              ? Router.push("/?targetDt=" + date.format("YYYYMMDD"))
              : ""
          }
        />
        <input
          type="text"
          className="border p-1"
          //value={text}
          //onChange={(event) => setText(event.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          //onClick={addItem}
        >
          추가
        </button>
      </div>
    </div>
  );
}
